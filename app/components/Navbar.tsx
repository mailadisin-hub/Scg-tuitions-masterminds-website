"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: "#0f5228" }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm border-2"
              style={{ backgroundColor: "#1a7a3a", borderColor: "#f5a623" }}
            >
              <span style={{ color: "#f5a623" }}>11+</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">SCG Tuitions</div>
              <div className="text-xs leading-tight" style={{ color: "#f5a623" }}>
                Masterminds
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white hover:text-yellow-300 transition-colors font-medium">
              Home
            </Link>
            <Link href="/masterminds" className="text-white hover:text-yellow-300 transition-colors font-medium">
              SCG Masterminds
            </Link>
            <Link href="/#about" className="text-white hover:text-yellow-300 transition-colors font-medium">
              About
            </Link>
            <Link href="/#faq" className="text-white hover:text-yellow-300 transition-colors font-medium">
              FAQ
            </Link>
            <Link
              href="/masterminds"
              className="px-4 py-2 rounded-full font-bold text-sm transition-all hover:scale-105"
              style={{ backgroundColor: "#f5a623", color: "#0f5228" }}
            >
              Start Learning
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2" style={{ borderTop: "1px solid #1a7a3a" }}>
            {[
              { href: "/", label: "Home" },
              { href: "/masterminds", label: "SCG Masterminds" },
              { href: "/#about", label: "About" },
              { href: "/#faq", label: "FAQ" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-white hover:text-yellow-300 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
