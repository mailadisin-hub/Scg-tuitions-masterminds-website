import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-20 px-4 text-white overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f5228 0%, #1a7a3a 60%, #2ea04f 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full" style={{ backgroundColor: "#f5a623" }}></div>
          <div
            className="absolute bottom-10 right-20 w-60 h-60 rounded-full"
            style={{ backgroundColor: "#f5a623" }}
          ></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: "#f5a623", color: "#0f5228" }}
          >
            FREE Learning Resources
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Welcome to <span style={{ color: "#f5a623" }}>SCG Tuitions</span>
            <br />
            Masterminds
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-green-100 max-w-2xl mx-auto">
            Personalised learning for every child — building confidence, skills, and a love of learning.
          </p>
          <p className="text-lg mb-8 text-green-200">
            Free comprehension quizzes read aloud by AI · Year 2 &amp; Year 3 · Results emailed to parents
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/masterminds"
              className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: "#f5a623", color: "#0f5228" }}
            >
              Start Learning Now
            </Link>
            <Link
              href="#about"
              className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white text-white hover:bg-white hover:text-green-900 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4" style={{ backgroundColor: "#f8fff8" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#0f5228" }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔊",
                title: "AI Reads Aloud",
                desc: "Each comprehension passage is read aloud clearly. Children listen and follow along at their own pace.",
              },
              {
                icon: "📝",
                title: "Answer Questions",
                desc: "After the story, children answer 5 multiple-choice questions to test their understanding.",
              },
              {
                icon: "📧",
                title: "Results to Parents",
                desc: "Quiz results and score are automatically emailed to the parent to track progress.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition-shadow"
                style={{ border: "2px solid #e8f5e9" }}
              >
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#0f5228" }}>
                  {f.title}
                </h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Year Group Cards */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "#0f5228" }}>
            SCG Masterminds
          </h2>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Choose your year group to access free comprehension quizzes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/masterminds/year-2/english">
              <div
                className="rounded-2xl p-8 text-white text-center transition-all hover:scale-105 shadow-lg cursor-pointer"
                style={{ background: "linear-gradient(135deg, #1a7a3a, #2ea04f)" }}
              >
                <div className="text-4xl mb-3">📖</div>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ backgroundColor: "#f5a623", color: "#0f5228" }}
                >
                  Year 2
                </div>
                <h3 className="text-2xl font-bold mb-2">English</h3>
                <p className="text-green-100 text-sm mb-4">5 comprehension stories with questions</p>
                <span className="text-sm font-semibold" style={{ color: "#f5a623" }}>
                  Start Reading →
                </span>
              </div>
            </Link>

            <Link href="/masterminds/year-3/english">
              <div
                className="rounded-2xl p-8 text-white text-center transition-all hover:scale-105 shadow-lg cursor-pointer"
                style={{ background: "linear-gradient(135deg, #0f5228, #1a7a3a)" }}
              >
                <div className="text-4xl mb-3">📚</div>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ backgroundColor: "#f5a623", color: "#0f5228" }}
                >
                  Year 3
                </div>
                <h3 className="text-2xl font-bold mb-2">English</h3>
                <p className="text-green-100 text-sm mb-4">5 comprehension stories with questions</p>
                <span className="text-sm font-semibold" style={{ color: "#f5a623" }}>
                  Start Reading →
                </span>
              </div>
            </Link>

            <div
              className="rounded-2xl p-8 text-center shadow-lg opacity-70"
              style={{ background: "linear-gradient(135deg, #555, #777)" }}
            >
              <div className="text-4xl mb-3">🎓</div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 bg-gray-500 text-white">
                Year 6
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">SATs Prep</h3>
              <p className="text-gray-300 text-sm mb-4">Full SATs preparation materials coming soon</p>
              <span className="text-sm font-semibold text-gray-400">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-4" style={{ backgroundColor: "#f0faf0" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#0f5228" }}>
                About SCG Tuitions
              </h2>
              <p className="text-gray-700 mb-4">
                SCG Tuitions provides personalised learning for every child. We believe every child has the potential to
                thrive academically with the right support, encouragement, and resources.
              </p>
              <p className="text-gray-700 mb-4">
                Our Masterminds programme offers free comprehension exercises designed to build reading confidence,
                vocabulary, and comprehension skills for children in Year 2 and Year 3.
              </p>
              <p className="text-gray-700">
                Each quiz uses AI-powered text-to-speech so children can hear the story read aloud before answering
                questions — just like in a real classroom setting.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "5", label: "Year 2 Comprehensions" },
                { number: "5", label: "Year 3 Comprehensions" },
                { number: "50+", label: "Quiz Questions" },
                { number: "100%", label: "Free to Use" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl p-5 text-center text-white" style={{ backgroundColor: "#1a7a3a" }}>
                  <div className="text-3xl font-extrabold" style={{ color: "#f5a623" }}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-green-100 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: "#0f5228" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is this free to use?",
                a: "Yes! All comprehension quizzes in the Masterminds section are completely free. We believe every child deserves access to quality learning resources.",
              },
              {
                q: "How does the AI reading work?",
                a: "We use your browser's built-in text-to-speech technology. When you click 'Read to Me', the passage will be read aloud clearly. Make sure your device's volume is turned up.",
              },
              {
                q: "Will my child's results be emailed?",
                a: "Yes. At the end of each quiz, enter a parent's name and email address. The results — including the score and which questions were correct — will be sent directly to that email.",
              },
              {
                q: "What year groups are covered?",
                a: "Currently we cover Year 2 (ages 6–7) and Year 3 (ages 7–8) English comprehension. Year 6 SATs preparation is coming soon.",
              },
              {
                q: "How many comprehensions are available?",
                a: "There are 5 comprehension passages for Year 2 and 5 for Year 3, each with 5 multiple-choice questions. More are added regularly.",
              },
              {
                q: "Can I use this on a tablet or phone?",
                a: "Yes! The website works on phones, tablets, and computers. Text-to-speech is supported on most modern browsers.",
              },
            ].map((item, i) => (
              <details key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: "#c8e6c9" }}>
                <summary
                  className="px-6 py-4 font-semibold cursor-pointer"
                  style={{ backgroundColor: "#f0faf0", color: "#0f5228" }}
                >
                  {item.q}
                </summary>
                <div className="px-6 py-4 bg-white text-gray-700">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
