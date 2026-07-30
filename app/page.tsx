import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero — matches SCG Tuitions style: full-width image + overlay */}
      <section
        className="relative text-white text-center py-28 px-6"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.52)), url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80') center/cover no-repeat",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            SCG Masterminds
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Free comprehension quizzes for Year 2 &amp; Year 3 — read aloud, answered, and results emailed to parents.
          </p>
          <Link
            href="/masterminds"
            className="inline-block px-8 py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-gray-900 transition-all text-sm"
          >
            Start Learning
          </Link>
        </div>

        {/* Feature strip — matches SCG Tuitions 3-panel strip */}
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 text-sm">
          {[
            { title: "AI Read-Aloud", desc: "Stories read clearly by your device's voice" },
            { title: "5 Questions", desc: "Multiple-choice comprehension quiz" },
            { title: "Email Results", desc: "Score sent directly to parents" },
          ].map((f) => (
            <div
              key={f.title}
              className="py-5 px-4 text-center"
              style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
            >
              <p className="font-semibold text-white">{f.title}</p>
              <p className="text-gray-300 text-xs mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Empowering Every Child&apos;s Potential
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              SCG Masterminds is a free resource from SCG Tuitions, designed to build reading comprehension for children in Year 2 and Year 3.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              Each comprehension is read aloud by the browser — no apps or downloads needed. Children listen, then answer five multiple-choice questions. Their score is emailed directly to the parent.
            </p>
            <Link
              href="/masterminds"
              className="inline-block px-6 py-2.5 rounded-full border border-gray-800 text-gray-800 text-sm font-medium hover:bg-gray-800 hover:text-white transition-all"
            >
              Browse Quizzes
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=700&q=80"
              alt="Children learning in a classroom"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Year group cards */}
      <section className="py-16 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Choose Your Year Group</h2>
          <p className="text-gray-500 text-center mb-10 text-sm">Free comprehension quizzes, each read aloud with five questions</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/masterminds/year-2/english">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-3xl mb-3">📖</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Year 2 · Ages 6–7</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">English Comprehension</h3>
                <p className="text-sm text-gray-500 mb-4">5 short stories with 5 multiple-choice questions each.</p>
                <span className="text-sm font-semibold text-blue-800">Start Reading →</span>
              </div>
            </Link>

            <Link href="/masterminds/year-3/english">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-3xl mb-3">📚</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Year 3 · Ages 7–8</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">English Comprehension</h3>
                <p className="text-sm text-gray-500 mb-4">5 longer fiction and non-fiction passages with questions.</p>
                <span className="text-sm font-semibold text-blue-800">Start Reading →</span>
              </div>
            </Link>

            <div className="bg-white rounded-xl border border-gray-200 p-6 opacity-50">
              <div className="text-3xl mb-3">🎓</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Year 6</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">SATs Preparation</h3>
              <p className="text-sm text-gray-500 mb-4">Full SATs preparation materials coming soon.</p>
              <span className="text-sm text-gray-400">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "Is this free to use?", a: "Yes — all comprehension quizzes are completely free. No account needed." },
              { q: "How does the read-aloud work?", a: "We use your browser's built-in text-to-speech. Click 'Read to Me' and the passage is read clearly. Make sure your volume is on." },
              { q: "Will my child's results be emailed?", a: "Yes. After answering all questions, enter a parent name and email and the results — score plus per-question breakdown — are sent immediately." },
              { q: "What year groups are available?", a: "Year 2 (ages 6–7) and Year 3 (ages 7–8) English comprehension are live. Year 6 SATs prep is coming soon." },
              { q: "Does it work on phones and tablets?", a: "Yes — it is fully responsive and works on all modern devices and browsers." },
            ].map((item, i) => (
              <details
                key={i}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 text-sm bg-white hover:bg-gray-50 transition-colors">
                  {item.q}
                </summary>
                <div className="px-5 py-4 text-sm text-gray-500 bg-white border-t border-gray-100">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
