export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex flex-col items-start mb-3">
              <div className="flex items-end gap-0.5 leading-none">
                <span className="text-xl font-black" style={{ color: "#1e3a8a" }}>11</span>
                <span className="text-lg font-black" style={{ color: "#dc2626" }}>+</span>
                <span className="text-base mb-0.5" style={{ color: "#16a34a" }}>✦</span>
              </div>
              <span className="text-xs font-bold tracking-wide mt-0.5" style={{ color: "#1e3a8a" }}>
                SCG Tuitions
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Personalised tuition classes for every child&apos;s unique needs.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">SCG Masterminds</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/masterminds/year-2/english" className="hover:text-gray-800 transition-colors">Year 2 English</a></li>
              <li><a href="/masterminds/year-3/english" className="hover:text-gray-800 transition-colors">Year 3 English</a></li>
              <li><span className="text-gray-400">Year 6 SATs — Coming Soon</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">SCG Tuitions</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="https://scgtuitions.co.uk/" className="hover:text-gray-800 transition-colors">Main Website</a></li>
              <li><a href="https://scgtuitions.co.uk/contact" className="hover:text-gray-800 transition-colors">Contact</a></li>
              <li><a href="https://scgtuitions.co.uk/enrol" className="hover:text-gray-800 transition-colors">Enrol</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} SCG Tuitions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
