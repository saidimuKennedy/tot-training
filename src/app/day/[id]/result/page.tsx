import Link from "next/link";
import { BottomNav } from "@/components/course/bottom-nav";
import { courseData, dayContent } from "@/lib/mock-data/course";

export default async function DayResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ answer?: string }>;
}) {
  const { id } = await params;
  const { answer } = await searchParams;
  const dayId = Number(id);
  const content = dayContent[dayId];

  if (!content) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] p-4">
        <p className="text-sm text-muted-foreground">Result data missing.</p>
      </main>
    );
  }

  const correct = answer === content.quiz.correctOptionId;
  const completedDays = Math.min(dayId, courseData.days.length);
  const percent = Math.round((completedDays / courseData.days.length) * 100);
  const nextDay = dayId + 1;
  const hasNext = courseData.days.some((d) => d.id === nextDay);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] pb-24">
      <header className="px-4 py-4">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="text-[#d32f2f]">◼</span>
          <span>KRA ACADEMY</span>
        </div>
      </header>
      <div className="px-4">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-xl bg-[#2a8d55] shadow-[0_12px_24px_rgba(0,0,0,0.2)]">
          <span className="text-4xl text-white">✓</span>
        </div>
        <p className="mt-5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#5e5e5e]">Journey Stage [01]</p>
        <h1 className="mt-1 text-center text-5xl font-black tracking-tight">Day {dayId} Complete</h1>

        <div className="mt-5 rounded-lg bg-[#2a8d55] p-4 text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d7ffdb]">Module Feedback // Success</p>
          <p className="mt-2 text-4xl font-bold leading-tight">
            {correct ? content.quiz.explanation : `Almost. Correct answer: ${content.quiz.options.find((o) => o.id === content.quiz.correctOptionId)?.label ?? "Expected option"}.`}
          </p>
        </div>

        <div className="mt-5 rounded-lg bg-white p-5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5e5e5e]">Overall Progress</p>
          <p className="mt-4 text-4xl font-black">{percent}%</p>
          <div className="mx-auto mt-3 h-2 w-full rounded-full bg-[#e2e2e2]">
            <div className="h-2 rounded-full bg-[#006533]" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-3 text-xs text-[#5e5e5e]">{completedDays} / {courseData.days.length} DAYS COMPLETED</p>
        </div>

        <div className="mt-4 h-40 overflow-hidden rounded-lg bg-[#1b1b1b]">
          <div className="h-full w-full bg-gradient-to-br from-[#1b1b1b] to-[#303030] p-3">
            <p className="mt-24 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">System_Status</p>
            <p className="text-3xl font-black text-white">COMPLIANCE ENGINE ACTIVE</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {hasNext ? (
            <Link href={`/day/${nextDay}`} className="inline-flex w-full items-center justify-center bg-[#af101a] px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white">
              Continue to Day {nextDay} →
            </Link>
          ) : (
            <Link href="/certificate" className="inline-flex w-full items-center justify-center bg-[#af101a] px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white">
              View Certificate
            </Link>
          )}
          <Link href="/course" className="inline-flex w-full items-center justify-center border border-[#af101a] bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#af101a]">
            ← Return to WhatsApp
          </Link>
        </div>
      </div>
      <BottomNav active="courses" />
    </main>
  );
}
