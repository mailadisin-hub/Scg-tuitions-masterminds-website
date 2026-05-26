"use client";

import { useState, useRef, useEffect } from "react";
import type { Comprehension } from "@/lib/comprehensions";

interface Props {
  comprehension: Comprehension;
}

type Phase = "intro" | "reading" | "quiz" | "email" | "done";

export default function ComprehensionQuiz({ comprehension }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function startReading() {
    setPhase("reading");
    speakText(comprehension.text);
  }

  function speakText(text: string) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.lang = "en-GB";
    utteranceRef.current = utterance;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  function replayReading() {
    speakText(comprehension.text);
  }

  function selectAnswer(questionIndex: number, optionIndex: number) {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  }

  function submitQuiz() {
    if (answers.some((a) => a === null)) {
      alert("Please answer all 5 questions before submitting.");
      return;
    }
    stopSpeaking();
    setSubmitted(true);
    setPhase("email");
  }

  const score = answers.filter((a, i) => a === comprehension.questions[i].correct).length;

  async function sendResults() {
    if (!parentEmail.trim() || !parentName.trim() || !childName.trim()) {
      setEmailError("Please fill in all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(parentEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSending(true);

    try {
      const questionResults = comprehension.questions.map((q, i) => ({
        question: q.question,
        chosen: q.options[answers[i] as number],
        correct: q.options[q.correct],
        isCorrect: answers[i] === q.correct,
      }));

      const res = await fetch("/api/send-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName,
          parentEmail,
          childName,
          comprehensionTitle: comprehension.title,
          year: comprehension.year,
          score,
          total: 5,
          questionResults,
        }),
      });

      if (res.ok) {
        setEmailSent(true);
        setPhase("done");
      } else {
        setEmailError("Failed to send email. Please try again.");
      }
    } catch {
      setEmailError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  if (phase === "intro") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div
          className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6"
          style={{ backgroundColor: "#e8f5e9", color: "#1a7a3a" }}
        >
          Year {comprehension.year} · English
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "#0f5228" }}>
          {comprehension.title}
        </h1>
        <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto">
          The AI will read this passage aloud to you. Listen carefully, then answer 5 questions. Your parent will
          receive your results by email.
        </p>
        <div
          className="bg-white rounded-2xl p-6 mb-8 text-left shadow-md"
          style={{ border: "2px solid #e8f5e9" }}
        >
          <h3 className="font-bold mb-3" style={{ color: "#0f5228" }}>
            How to take this quiz:
          </h3>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-bold" style={{ color: "#f5a623" }}>
                1.
              </span>{" "}
              Click <strong>&quot;Read to Me&quot;</strong> — sit back and listen to the story.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold" style={{ color: "#f5a623" }}>
                2.
              </span>{" "}
              When the reading is finished, click <strong>&quot;Start Questions&quot;</strong>.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold" style={{ color: "#f5a623" }}>
                3.
              </span>{" "}
              Answer all 5 questions, then submit.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold" style={{ color: "#f5a623" }}>
                4.
              </span>{" "}
              Enter your parent&apos;s email to receive the results.
            </li>
          </ol>
        </div>
        <button
          onClick={startReading}
          className="px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg text-white"
          style={{ backgroundColor: "#1a7a3a" }}
        >
          🔊 Read to Me
        </button>
      </div>
    );
  }

  if (phase === "reading") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: "#0f5228" }}>
            {comprehension.title}
          </h1>
          {isSpeaking ? (
            <div className="flex items-center justify-center gap-2 mt-3">
              <div
                className="w-3 h-3 rounded-full speaking-indicator"
                style={{ backgroundColor: "#1a7a3a" }}
              ></div>
              <span className="text-sm font-medium" style={{ color: "#1a7a3a" }}>
                Reading aloud...
              </span>
            </div>
          ) : (
            <p className="text-gray-500 text-sm mt-2">Reading complete. You can read along below.</p>
          )}
        </div>

        <div
          className="bg-white rounded-2xl p-8 shadow-md mb-8 text-gray-800 leading-relaxed text-lg whitespace-pre-line"
          style={{ border: "2px solid #e8f5e9" }}
        >
          {comprehension.text}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {isSpeaking ? (
            <button
              onClick={stopSpeaking}
              className="px-6 py-3 rounded-full font-semibold border-2 transition-all"
              style={{ borderColor: "#1a7a3a", color: "#1a7a3a" }}
            >
              ⏹ Stop Reading
            </button>
          ) : (
            <button
              onClick={replayReading}
              className="px-6 py-3 rounded-full font-semibold border-2 transition-all"
              style={{ borderColor: "#1a7a3a", color: "#1a7a3a" }}
            >
              🔄 Replay
            </button>
          )}
          <button
            onClick={() => {
              stopSpeaking();
              setPhase("quiz");
            }}
            className="px-8 py-3 rounded-full font-bold text-white transition-all hover:scale-105 shadow-md"
            style={{ backgroundColor: "#1a7a3a" }}
          >
            Start Questions →
          </button>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold" style={{ color: "#0f5228" }}>
            {comprehension.title} — Questions
          </h1>
          <p className="text-gray-500 mt-2">Answer all 5 questions below</p>
        </div>

        <div className="space-y-8">
          {comprehension.questions.map((q, qi) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-md" style={{ border: "2px solid #e8f5e9" }}>
              <h3 className="font-bold text-lg mb-4" style={{ color: "#0f5228" }}>
                <span
                  className="inline-block w-8 h-8 rounded-full text-white text-center text-sm leading-8 mr-2 font-bold"
                  style={{ backgroundColor: "#1a7a3a" }}
                >
                  {qi + 1}
                </span>
                {q.question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => selectAnswer(qi, oi)}
                    className="quiz-option text-left px-4 py-3 rounded-xl border-2 font-medium transition-all"
                    style={{
                      borderColor: answers[qi] === oi ? "#1a7a3a" : "#e0e0e0",
                      backgroundColor: answers[qi] === oi ? "#e8f5e9" : "#ffffff",
                      color: answers[qi] === oi ? "#0f5228" : "#444",
                    }}
                  >
                    <span
                      className="inline-block w-6 h-6 rounded-full text-center text-xs leading-6 mr-2 font-bold"
                      style={{
                        backgroundColor: answers[qi] === oi ? "#1a7a3a" : "#f0f0f0",
                        color: answers[qi] === oi ? "#fff" : "#888",
                      }}
                    >
                      {["A", "B", "C", "D"][oi]}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            {answers.filter((a) => a !== null).length} of 5 questions answered
          </p>
          <button
            onClick={submitQuiz}
            className="px-10 py-4 rounded-full font-bold text-lg text-white transition-all hover:scale-105 shadow-lg"
            style={{ backgroundColor: answers.some((a) => a === null) ? "#9e9e9e" : "#1a7a3a" }}
          >
            Submit Answers
          </button>
        </div>
      </div>
    );
  }

  if (phase === "email") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {score >= 4 ? "🌟" : score >= 3 ? "👍" : "💪"}
          </div>
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: "#0f5228" }}>
            Quiz Complete!
          </h1>
          <div
            className="inline-block text-4xl font-extrabold px-6 py-3 rounded-2xl text-white my-4"
            style={{ backgroundColor: score >= 4 ? "#1a7a3a" : score >= 3 ? "#f5a623" : "#e53935" }}
          >
            {score} / 5
          </div>
          <p className="text-gray-600 text-lg">
            {score === 5
              ? "Perfect score! Absolutely brilliant!"
              : score >= 4
              ? "Excellent work! Nearly perfect!"
              : score >= 3
              ? "Good job! Keep practising!"
              : "Well done for trying! Let's review and try again!"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md mb-6" style={{ border: "2px solid #e8f5e9" }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: "#0f5228" }}>
            Question Review
          </h3>
          {comprehension.questions.map((q, i) => (
            <div key={q.id} className="mb-3 flex items-start gap-3">
              <span className="text-xl mt-0.5">{answers[i] === q.correct ? "✅" : "❌"}</span>
              <div>
                <p className="text-sm font-medium text-gray-700">{q.question}</p>
                {answers[i] !== q.correct && (
                  <p className="text-xs text-gray-500 mt-1">
                    Correct answer: <strong>{q.options[q.correct]}</strong>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md" style={{ border: "2px solid #e8f5e9" }}>
          <h3 className="font-bold text-lg mb-2" style={{ color: "#0f5228" }}>
            📧 Email Results to Parent
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Enter your details below to send the results to your parent&apos;s email.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Child&apos;s Name</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Enter child's first name"
                className="w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors"
                style={{ borderColor: childName ? "#1a7a3a" : "#e0e0e0" }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Parent&apos;s Name</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Enter parent's name"
                className="w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors"
                style={{ borderColor: parentName ? "#1a7a3a" : "#e0e0e0" }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Parent&apos;s Email Address</label>
              <input
                type="email"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors"
                style={{ borderColor: parentEmail ? "#1a7a3a" : "#e0e0e0" }}
              />
            </div>

            {emailError && (
              <div className="bg-red-50 text-red-700 rounded-xl px-4 py-3 text-sm border border-red-200">
                {emailError}
              </div>
            )}

            <button
              onClick={sendResults}
              disabled={sending}
              className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all hover:scale-105 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#1a7a3a" }}
            >
              {sending ? "Sending..." : "📧 Send Results to Parent"}
            </button>

            <p className="text-xs text-gray-400 text-center">
              By submitting, you agree to receive quiz results and occasional updates from SCG Tuitions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Done phase
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="text-7xl mb-6 star-burst">🎉</div>
      <h1 className="text-4xl font-extrabold mb-4" style={{ color: "#0f5228" }}>
        Results Sent!
      </h1>
      <p className="text-gray-600 text-lg mb-4">
        We&apos;ve emailed your results to <strong>{parentEmail}</strong>.
      </p>
      <p className="text-gray-500 mb-8">
        Keep practising to improve your score! Try another comprehension below.
      </p>

      <div
        className="bg-white rounded-2xl p-6 shadow-md mb-8 text-left"
        style={{ border: "2px solid #e8f5e9" }}
      >
        <h3 className="font-bold mb-2" style={{ color: "#0f5228" }}>
          Your Score
        </h3>
        <div className="flex items-center gap-4">
          <div
            className="text-3xl font-extrabold px-5 py-2 rounded-xl text-white"
            style={{ backgroundColor: score >= 4 ? "#1a7a3a" : score >= 3 ? "#f5a623" : "#e53935" }}
          >
            {score} / 5
          </div>
          <div>
            <p className="text-gray-700 font-medium">{comprehension.title}</p>
            <p className="text-sm text-gray-500">Year {comprehension.year} English</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={`/masterminds/year-${comprehension.year}/english`}
          className="px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 shadow-lg"
          style={{ backgroundColor: "#1a7a3a" }}
        >
          Try Another Story
        </a>
        <a
          href="/masterminds"
          className="px-8 py-4 rounded-full font-bold border-2 transition-all hover:scale-105"
          style={{ borderColor: "#1a7a3a", color: "#1a7a3a" }}
        >
          Back to Masterminds
        </a>
      </div>
    </div>
  );
}
