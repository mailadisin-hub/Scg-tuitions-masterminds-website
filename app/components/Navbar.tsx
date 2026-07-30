"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMasterminds = pathname.startsWith("/masterminds") || pathname === "/";

  const externalLinks = [
    { label: "Home", href: "https://scgtuitions.co.uk/" },
    { label: "Swindon Mock 2026", href: "https://scgtuitions.co.uk/swindon-mock-2026" },
    { label: "Store", href: "https://scgtuitions.co.uk/store" },
    { label: "Contact", href: "https://scgtuitions.co.uk/contact" },
    { label: "Enrol", href: "https://scgtuitions.co.uk/enrol" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <a href="https://scgtuitions.co.uk/" className="flex-shrink-0">
            <Image
              src="/scg-logo.svg"
              alt="SCG Tuitions"
              width={130}
              height={60}
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 border-transparent hover:border-gray-300 transition-all"
              >
                {link.label}
              </a>
            ))}

            {/* SCG Masterminds — the new active tab */}
            <Link
              href="/"
              className="text-sm font-semibold pb-1 border-b-2 transition-all"
              style={{
                color: isMasterminds ? "#1a2870" : "#555",
                borderBottomColor: isMasterminds ? "#1a2870" : "transparent",
              }}
            >
              SCG Masterminds
            </Link>

            {/* Cart icon */}
            <a href="https://scgtuitions.co.uk/cart" className="text-gray-500 hover:text-gray-800 ml-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-3 space-y-1 border-t border-gray-100">
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/"
              className="block py-2 text-sm font-semibold"
              style={{ color: "#1a2870" }}
              onClick={() => setMenuOpen(false)}
            >
              SCG Masterminds
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
