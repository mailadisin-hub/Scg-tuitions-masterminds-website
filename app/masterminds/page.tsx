import Link from "next/link";

export default function MastermindsPage() {
  return (
    <div>
      <section
        className="py-16 px-4 text-white"
        style={{ background: "linear-gradient(135deg, #0f5228, #1a7a3a)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: "#f5a623", color: "#0f5228" }}
          >
            SCG Masterminds
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Free Learning Resources
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Choose your year group to begin. Each section includes AI-read comprehensions and interactive quizzes
            with results emailed directly to parents.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "#0f5228" }}>
            Year 2 — Ages 6–7
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link href="/masterminds/year-2/english">
              <div
                className="rounded-2xl p-8 text-white transition-all hover:scale-105 shadow-lg cursor-pointer"
                style={{ background: "linear-gradient(135deg, #1a7a3a, #2ea04f)" }}
              >
                <div className="text-4xl mb-4">📖</div>
                <h3 className="text-2xl font-bold mb-2">English — Comprehension</h3>
                <p className="text-green-100 mb-4">
                  5 stories read aloud by AI, each followed by 5 multiple-choice questions. Perfect for building
                  reading comprehension at Year 2 level.
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "#f5a623", color: "#0f5228" }}
                  >
                    5 Comprehensions
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "#f5a623", color: "#0f5228" }}
                  >
                    Free
                  </span>
                </div>
              </div>
            </Link>

            <div
              className="rounded-2xl p-8 text-white shadow-lg opacity-60"
              style={{ background: "linear-gradient(135deg, #555, #777)" }}
            >
              <div className="text-4xl mb-4">🔢</div>
              <h3 className="text-2xl font-bold mb-2">Maths — Coming Soon</h3>
              <p className="text-gray-300 mb-4">
                Addition, subtraction, multiplication and division practice activities for Year 2.
              </p>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-600 text-gray-300">
                Coming Soon
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-8" style={{ color: "#0f5228" }}>
            Year 3 — Ages 7–8
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link href="/masterminds/year-3/english">
              <div
                className="rounded-2xl p-8 text-white transition-all hover:scale-105 shadow-lg cursor-pointer"
                style={{ background: "linear-gradient(135deg, #0f5228, #1a7a3a)" }}
              >
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-2xl font-bold mb-2">English — Comprehension</h3>
                <p className="text-green-100 mb-4">
                  5 longer, more challenging passages including fiction and non-fiction texts, each with 5
                  multiple-choice questions at Year 3 level.
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "#f5a623", color: "#0f5228" }}
                  >
                    5 Comprehensions
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "#f5a623", color: "#0f5228" }}
                  >
                    Free
                  </span>
                </div>
              </div>
            </Link>

            <div
              className="rounded-2xl p-8 text-white shadow-lg opacity-60"
              style={{ background: "linear-gradient(135deg, #555, #777)" }}
            >
              <div className="text-4xl mb-4">🔢</div>
              <h3 className="text-2xl font-bold mb-2">Maths — Coming Soon</h3>
              <p className="text-gray-300 mb-4">
                Times tables, written methods for addition and subtraction, and more for Year 3.
              </p>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-600 text-gray-300">
                Coming Soon
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-8" style={{ color: "#0f5228" }}>
            Year 6 — SATs Preparation
          </h2>
          <div
            className="rounded-2xl p-8 text-white shadow-lg opacity-60 max-w-md"
            style={{ background: "linear-gradient(135deg, #333, #555)" }}
          >
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold mb-2">SATs Prep — Coming Soon</h3>
            <p className="text-gray-300 mb-4">
              Full SATs preparation materials including reading comprehension, grammar, and maths practice for Year 6
              pupils.
            </p>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-600 text-gray-300">
              Coming Soon
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
