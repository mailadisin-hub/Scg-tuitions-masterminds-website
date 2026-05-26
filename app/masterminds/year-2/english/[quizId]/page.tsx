import { notFound } from "next/navigation";
import Link from "next/link";
import { year2Comprehensions, getComprehensionById } from "@/lib/comprehensions";
import ComprehensionQuiz from "@/app/components/ComprehensionQuiz";

export async function generateStaticParams() {
  return year2Comprehensions.map((c) => ({ quizId: c.id }));
}

export default async function Year2QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const comprehension = getComprehensionById(quizId);

  if (!comprehension || comprehension.year !== 2) {
    notFound();
  }

  return (
    <div>
      <div className="py-4 px-4" style={{ backgroundColor: "#f0faf0", borderBottom: "1px solid #c8e6c9" }}>
        <div className="max-w-3xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/masterminds" className="hover:text-green-700">
            Masterminds
          </Link>
          <span>›</span>
          <Link href="/masterminds/year-2/english" className="hover:text-green-700">
            Year 2 English
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">{comprehension.title}</span>
        </div>
      </div>
      <ComprehensionQuiz comprehension={comprehension} />
    </div>
  );
}
