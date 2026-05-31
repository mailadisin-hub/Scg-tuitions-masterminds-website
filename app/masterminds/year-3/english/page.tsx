import Link from "next/link";
import { year3Comprehensions } from "@/lib/comprehensions";

export default function Year3EnglishPage() {
  return (
    <div>
      <section className="bg-gray-50 border-b border-gray-200 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
            <Link href="/masterminds" className="hover:text-gray-700">Masterminds</Link>
            <span>›</span>
            <span>Year 3</span>
            <span>›</span>
            <span className="text-gray-600">English</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Year 3 · Ages 7–8</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">English Comprehension</h1>
          <p className="text-gray-500 text-base">
            Choose a passage below. It will be read aloud to your child, then they answer 5 questions. Results are emailed to the parent.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {year3Comprehensions.map((comp, index) => (
            <Link key={comp.id} href={`/masterminds/year-3/english/${comp.id}`}>
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: "#27ae60" }}
                  >
                    {index + 1}
                  </span>
                  <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Year 3</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{comp.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {comp.text.substring(0, 95)}…
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>🔊 Read-aloud · 5 questions</span>
                  <span className="font-semibold" style={{ color: "#27ae60" }}>Start →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
