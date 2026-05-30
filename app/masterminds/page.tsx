import Link from "next/link";

export default function MastermindsPage() {
  return (
    <div>
      <section className="bg-gray-50 border-b border-gray-200 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">SCG Masterminds</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Free Learning Resources</h1>
          <p className="text-gray-500 text-base max-w-xl">
            Choose your year group to begin. Stories are read aloud by your device, then your child answers five questions. Results are emailed to the parent.
          </p>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Year 2 <span className="font-normal text-gray-400">— Ages 6–7</span></h2>
          <p className="text-sm text-gray-400 mb-6">Short stories with clear vocabulary and five comprehension questions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <Link href="/masterminds/year-2/english">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
                <div className="text-2xl mb-3">📖</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">English</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">Comprehension Quizzes</h3>
                <p className="text-sm text-gray-500 mb-4">5 read-aloud stories, 5 questions each. Results emailed to parent.</p>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">5 quizzes</span>
                  <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Free</span>
                </div>
              </div>
            </Link>
            <div className="bg-white border border-dashed border-gray-200 rounded-xl p-6 opacity-50">
              <div className="text-2xl mb-3">🔢</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Maths</div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Skills Practice</h3>
              <p className="text-sm text-gray-500 mb-4">Addition, subtraction, multiplication and division for Year 2.</p>
              <span className="text-xs text-gray-400 border border-gray-200 px-2.5 py-1 rounded-full">Coming Soon</span>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-1">Year 3 <span className="font-normal text-gray-400">— Ages 7–8</span></h2>
          <p className="text-sm text-gray-400 mb-6">Longer fiction and non-fiction passages with more challenging questions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <Link href="/masterminds/year-3/english">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
                <div className="text-2xl mb-3">📚</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">English</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">Comprehension Quizzes</h3>
                <p className="text-sm text-gray-500 mb-4">5 read-aloud passages including fiction and non-fiction, 5 questions each.</p>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">5 quizzes</span>
                  <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Free</span>
                </div>
              </div>
            </Link>
            <div className="bg-white border border-dashed border-gray-200 rounded-xl p-6 opacity-50">
              <div className="text-2xl mb-3">🔢</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Maths</div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Skills Practice</h3>
              <p className="text-sm text-gray-500 mb-4">Times tables, written methods and more for Year 3.</p>
              <span className="text-xs text-gray-400 border border-gray-200 px-2.5 py-1 rounded-full">Coming Soon</span>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-1">Year 6 <span className="font-normal text-gray-400">— SATs Preparation</span></h2>
          <p className="text-sm text-gray-400 mb-6">Full SATs preparation materials — coming soon</p>
          <div className="bg-white border border-dashed border-gray-200 rounded-xl p-6 opacity-50 max-w-sm">
            <div className="text-2xl mb-3">🎓</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">SATs Prep</div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Year 6 Resources</h3>
            <p className="text-sm text-gray-500 mb-4">Reading comprehension, grammar, and maths practice.</p>
            <span className="text-xs text-gray-400 border border-gray-200 px-2.5 py-1 rounded-full">Coming Soon</span>
          </div>
        </div>
      </section>
    </div>
  );
}
