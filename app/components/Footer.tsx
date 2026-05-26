export default function Footer() {
  return (
    <footer className="text-white py-10 mt-16" style={{ backgroundColor: "#0f5228" }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2"
                style={{ backgroundColor: "#1a7a3a", borderColor: "#f5a623" }}
              >
                <span style={{ color: "#f5a623" }}>11+</span>
              </div>
              <div>
                <div className="font-bold text-lg">SCG Tuitions</div>
                <div className="text-xs" style={{ color: "#f5a623" }}>
                  Masterminds
                </div>
              </div>
            </div>
            <p className="text-sm text-green-200">
              Personalised learning for every child. Building confidence, skills, and a love of learning.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3" style={{ color: "#f5a623" }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/masterminds" className="hover:text-white transition-colors">
                  SCG Masterminds
                </a>
              </li>
              <li>
                <a href="/masterminds/year-2/english" className="hover:text-white transition-colors">
                  Year 2 English
                </a>
              </li>
              <li>
                <a href="/masterminds/year-3/english" className="hover:text-white transition-colors">
                  Year 3 English
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3" style={{ color: "#f5a623" }}>
              Contact
            </h3>
            <p className="text-sm text-green-200">
              For enquiries about SCG Tuitions and the Masterminds programme, please get in touch via our website.
            </p>
            <p className="text-sm text-green-200 mt-2">
              <span style={{ color: "#f5a623" }}>Email:</span> info@scgtuitions.co.uk
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 text-center text-sm text-green-300" style={{ borderTop: "1px solid #1a7a3a" }}>
          <p>&copy; {new Date().getFullYear()} SCG Tuitions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
