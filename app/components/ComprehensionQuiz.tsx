"use client";

import { useState, useRef, useEffect } from "react";
import type { Comprehension } from "@/lib/comprehensions";

type Phase = "intro" | "reading" | "quiz" | "email" | "done";

export default function ComprehensionQuiz({ comprehension }: { comprehension: Comprehension }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);

  function speak(text: string) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.88; u.pitch = 1.05; u.lang = "en-GB";
    utteranceRef.current = u;
    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(u);
  }

  function stop() { window.speechSynthesis.cancel(); setIsSpeaking(false); }

  function selectAnswer(qi: number, oi: number) {
    if (submitted) return;
    const a = [...answers]; a[qi] = oi; setAnswers(a);
  }

  function submitQuiz() {
    if (answers.some((a) => a === null)) { alert("Please answer all 5 questions before submitting."); return; }
    stop(); setSubmitted(true); setPhase("email");
  }

  const score = answers.filter((a, i) => a === comprehension.questions[i].correct).length;

  async function sendResults() {
    if (!parentEmail.trim() || !parentName.trim() || !childName.trim()) { setEmailError("Please fill in all fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail)) { setEmailError("Please enter a valid email address."); return; }
    setEmailError(""); setSending(true);
    try {
      const res = await fetch("/api/send-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName, parentEmail, childName,
          comprehensionTitle: comprehension.title,
          year: comprehension.year, score, total: 5,
          questionResults: comprehension.questions.map((q, i) => ({
            question: q.question,
            chosen: q.options[answers[i] as number],
            correct: q.options[q.correct],
            isCorrect: answers[i] === q.correct,
          })),
        }),
      });
      if (res.ok) { setPhase("done"); }
      else { setEmailError("Failed to send. Please try again."); }
    } catch { setEmailError("Network error. Please check your connection."); }
    finally { setSending(false); }
  }

  const accentColor = comprehension.year === 2 ? "#1a2870" : "#27ae60";

  /* ── INTRO ─────────────────────────────────────────────── */
  if (phase === "intro") return (
    <div className="max-w-2xl mx-auto px-6 py-12 fade-in">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
        Year {comprehension.year} · English
      </p>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">{comprehension.title}</h1>
      <p className="text-gray-500 mb-8">
        The passage will be read aloud by your device. Listen carefully, then answer 5 questions. Your parent will receive the results by email.
      </p>

      <div className="border border-gray-200 rounded-xl p-5 mb-8 bg-gray-50">
        <p className="text-sm font-semibold text-gray-700 mb-3">How it works:</p>
        <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>Click <strong>Read to Me</strong> and listen to the full passage.</li>
          <li>When it finishes, click <strong>Start Questions</strong>.</li>
          <li>Answer all 5 multiple-choice questions.</li>
          <li>Enter your parent&apos;s email to receive the results.</li>
        </ol>
      </div>

      <button
        onClick={() => { setPhase("reading"); speak(comprehension.text); }}
        className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 font-semibold text-sm transition-all hover:text-white"
        style={{ borderColor: accentColor, color: accentColor }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = accentColor; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
      >
        🔊 Read to Me
      </button>
    </div>
  );

  /* ── READING ────────────────────────────────────────────── */
  if (phase === "reading") return (
    <div className="max-w-2xl mx-auto px-6 py-10 fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{comprehension.title}</h1>
        {isSpeaking
          ? <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 rounded-full speaking-pulse" style={{ backgroundColor: accentColor }}></span>
              Reading aloud…
            </div>
          : <p className="text-sm text-gray-400">Reading complete — you can read along below.</p>
        }
      </div>

      <div className="border border-gray-200 rounded-xl p-6 bg-white text-gray-700 leading-relaxed text-base whitespace-pre-line mb-6">
        {comprehension.text}
      </div>

      <div className="flex flex-wrap gap-3">
        {isSpeaking
          ? <button onClick={stop} className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">⏹ Stop</button>
          : <button onClick={() => speak(comprehension.text)} className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">🔄 Replay</button>
        }
        <button
          onClick={() => { stop(); setPhase("quiz"); }}
          className="px-7 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: accentColor }}
        >
          Start Questions →
        </button>
      </div>
    </div>
  );

  /* ── QUIZ ───────────────────────────────────────────────── */
  if (phase === "quiz") return (
    <div className="max-w-2xl mx-auto px-6 py-10 fade-in">
      <h1 className="text-xl font-bold text-gray-900 mb-1">{comprehension.title}</h1>
      <p className="text-sm text-gray-400 mb-8">Answer all 5 questions — {answers.filter(a => a !== null).length} of 5 answered</p>

      <div className="space-y-6">
        {comprehension.questions.map((q, qi) => (
          <div key={q.id} className="border border-gray-200 rounded-xl p-5 bg-white">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm">
              <span
                className="inline-flex w-6 h-6 rounded-full text-white text-xs items-center justify-center mr-2 font-bold"
                style={{ backgroundColor: accentColor }}
              >
                {qi + 1}
              </span>
              {q.question}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => selectAnswer(qi, oi)}
                  className="quiz-option text-left px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all"
                  style={{
                    borderColor: answers[qi] === oi ? accentColor : "#e5e7eb",
                    backgroundColor: answers[qi] === oi ? (comprehension.year === 2 ? "#eff6ff" : "#f0fdf4") : "#fff",
                    color: answers[qi] === oi ? accentColor : "#374151",
                  }}
                >
                  <span
                    className="inline-flex w-5 h-5 rounded-full text-xs items-center justify-center mr-2 font-bold"
                    style={{
                      backgroundColor: answers[qi] === oi ? accentColor : "#f3f4f6",
                      color: answers[qi] === oi ? "#fff" : "#9ca3af",
                    }}
                  >
                    {["A","B","C","D"][oi]}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          onClick={submitQuiz}
          className="px-10 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: answers.some(a => a === null) ? "#9ca3af" : accentColor }}
        >
          Submit Answers
        </button>
      </div>
    </div>
  );

  /* ── EMAIL FORM ─────────────────────────────────────────── */
  if (phase === "email") return (
    <div className="max-w-xl mx-auto px-6 py-12 fade-in">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">{score >= 4 ? "🌟" : score >= 3 ? "👍" : "💪"}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
        <div
          className="inline-block text-3xl font-bold px-6 py-2 rounded-xl text-white my-3"
          style={{ backgroundColor: score >= 4 ? "#16a34a" : score >= 3 ? "#d97706" : "#dc2626" }}
        >
          {score} / 5
        </div>
        <p className="text-gray-500 text-sm">
          {score === 5 ? "Perfect score — brilliant!" : score >= 4 ? "Excellent — nearly perfect!" : score >= 3 ? "Good job — keep practising!" : "Well done for trying!"}
        </p>
      </div>

      {/* Question review */}
      <div className="border border-gray-200 rounded-xl p-5 mb-6 bg-white">
        <p className="text-sm font-semibold text-gray-700 mb-3">Question Review</p>
        <div className="space-y-2">
          {comprehension.questions.map((q, i) => (
            <div key={q.id} className="flex items-start gap-3">
              <span className="text-base mt-0.5">{answers[i] === q.correct ? "✅" : "❌"}</span>
              <div>
                <p className="text-sm text-gray-700">{q.question}</p>
                {answers[i] !== q.correct && (
                  <p className="text-xs text-red-500 mt-0.5">Correct: <strong>{q.options[q.correct]}</strong></p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email form */}
      <div className="border border-gray-200 rounded-xl p-5 bg-white">
        <p className="text-sm font-semibold text-gray-700 mb-1">📧 Email Results to Parent</p>
        <p className="text-xs text-gray-400 mb-4">Enter details below to send the score and question breakdown.</p>
        <div className="space-y-3">
          {[
            { label: "Child's Name", val: childName, set: setChildName, ph: "Child's first name", type: "text" },
            { label: "Parent's Name", val: parentName, set: setParentName, ph: "Parent's name", type: "text" },
            { label: "Parent's Email", val: parentEmail, set: setParentEmail, ph: "parent@example.com", type: "email" },
          ].map(({ label, val, set, ph, type }) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
              <input
                type={type}
                value={val}
                onChange={e => set(e.target.value)}
                placeholder={ph}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
              />
            </div>
          ))}
          {emailError && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{emailError}</p>}
          <button
            onClick={sendResults}
            disabled={sending}
            className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: accentColor }}
          >
            {sending ? "Sending…" : "Send Results to Parent"}
          </button>
          <p className="text-xs text-gray-400 text-center">By submitting you agree to receive quiz results and occasional updates from SCG Tuitions.</p>
        </div>
      </div>
    </div>
  );

  /* ── DONE ───────────────────────────────────────────────── */
  return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center fade-in">
      <div className="text-6xl mb-5">🎉</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Results Sent!</h1>
      <p className="text-gray-500 mb-1">Results emailed to <strong>{parentEmail}</strong>.</p>
      <p className="text-gray-400 text-sm mb-8">Keep practising to improve the score!</p>

      <div className="border border-gray-200 rounded-xl p-5 mb-8 bg-white text-left">
        <p className="text-xs font-semibold text-gray-500 mb-3">Your Score</p>
        <div className="flex items-center gap-4">
          <div
            className="text-2xl font-bold px-5 py-2 rounded-lg text-white"
            style={{ backgroundColor: score >= 4 ? "#16a34a" : score >= 3 ? "#d97706" : "#dc2626" }}
          >
            {score} / 5
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{comprehension.title}</p>
            <p className="text-xs text-gray-400">Year {comprehension.year} English</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={`/masterminds/year-${comprehension.year}/english`}
          className="px-7 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-all"
          style={{ backgroundColor: accentColor }}
        >
          Try Another Story
        </a>
        <a
          href="/masterminds"
          className="px-7 py-2.5 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
        >
          Back to Masterminds
        </a>
      </div>
    </div>
  );
}
