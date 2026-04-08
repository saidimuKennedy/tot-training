import Link from "next/link";
import { BottomNav } from "@/components/course/bottom-nav";
import { courseData, dayContent } from "@/lib/mock-data/course";

export default async function DayOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dayId = Number(id);
  const day = courseData.days.find((d) => d.id === dayId);
  const content = dayContent[dayId];

  if (!day || !content) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] p-4">
        <p className="text-sm text-muted-foreground">This day is not configured yet.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] pb-36">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="text-[#d32f2f]">◼</span>
          <span>KRA ACADEMY</span>
        </div>
      </header>

      <div className="px-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5e5e5e]">
          MODULE {String(day.id).padStart(2, "0")} • ORIENTATION
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">{day.title}</h1>

        <section className="mt-6 bg-white p-5 shadow-[0_12px_28px_rgba(27,27,27,0.06)]">
          <h3 className="mb-4 text-2xl font-black uppercase tracking-tight">What you&apos;ll learn today</h3>
          <ul className="space-y-4">
            {content.overview.map((point, index) => (
              <li key={point}>
                <p className="text-xs font-bold text-[#af101a]">[{String(index + 1).padStart(2, "0")}]</p>
                <p className="text-xl font-bold leading-tight">{point}</p>
              </li>
            ))}
          </ul>
        </section>

      </div>

      <div className="pointer-events-none fixed bottom-20 left-0 right-0 mx-auto w-full max-w-[390px] px-4">
        <Link
          href={`/day/${dayId}/lesson`}
          className="pointer-events-auto inline-flex w-full items-center justify-center bg-[#af101a] px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_12px_24px_rgba(175,16,26,0.35)]"
        >
          Play Lesson ▶
        </Link>
      </div>
      <BottomNav active="courses" />
    </main>
  );
}
