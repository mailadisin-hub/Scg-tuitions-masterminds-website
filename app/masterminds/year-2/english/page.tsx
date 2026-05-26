import Link from "next/link";
import { year2Comprehensions } from "@/lib/comprehensions";

export default function Year2EnglishPage() {
  return (
    <div>
      <section
        className="py-14 px-4 text-white"
        style={{ background: "linear-gradient(135deg, #0f5228, #1a7a3a)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-green-200 text-sm">
            <Link href="/masterminds" className="hover:text-white">
              Masterminds
            </Link>
            <span>›</span>
            <span>Year 2</span>
            <span>›</span>
            <span className="text-white">English</span>
          </div>
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: "#f5a623", color: "#0f5228" }}
          >
            Year 2 · Ages 6–7
          </div>
          <h1 className="text-4xl font-extrabold mb-3">English Comprehension</h1>
          <p className="text-green-100 text-lg max-w-2xl">
            Choose a story below. The AI will read it aloud, then you&apos;ll answer 5 questions. Results are emailed to
            your parent.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {year2Comprehensions.map((comp, index) => (
              <Link key={comp.id} href={`/masterminds/year-2/english/${comp.id}`}>
                <div
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-2"
                  style={{ borderColor: "#c8e6c9" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: "#1a7a3a" }}
                    >
                      {index + 1}
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: "#e8f5e9", color: "#1a7a3a" }}
                    >
                      Year 2
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#0f5228" }}>
                    {comp.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {comp.text.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>🔊 AI Read-Aloud</span>
                      <span>·</span>
                      <span>5 Questions</span>
                    </div>
                    <span className="font-semibold text-sm" style={{ color: "#1a7a3a" }}>
                      Start →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
