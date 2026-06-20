import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SCG Masterminds",
  description:
    "SCG Masterminds — learning quizzes from SCG Tuitions: phonics, English comprehension and maths for Reception to Year 6.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
