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
        <h1 className="mt-3 text-6xl font-black tracking-tight">{day.title}</h1>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.1em]">● 45 MINUTES</span>
          <span className="inline-flex items-center gap-2 bg-[#fff2f0] px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#af101a]">● REQUIRED FOR CERTIFICATION</span>
        </div>

        <section className="mt-6 bg-white p-5 shadow-[0_12px_28px_rgba(27,27,27,0.06)]">
          <h3 className="mb-4 text-3xl font-black uppercase tracking-tight">What you&apos;ll learn today</h3>
          <ul className="space-y-4">
            {content.overview.map((point, index) => (
              <li key={point}>
                <p className="text-xs font-bold text-[#af101a]">[{String(index + 1).padStart(2, "0")}]</p>
                <p className="text-2xl font-bold leading-tight">{point}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-4 bg-[#1b1b1b] p-5 text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">Editorial Insight</p>
          <p className="mt-3 text-2xl italic leading-relaxed">
            &quot;For Kenya ToT, accurate setup means: verify the turnover band, activate ToT obligation on iTax, and keep daily sales records from day one.&quot;
          </p>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#af101a]">Why this matters</p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">{content.why}</p>
        </section>

        <section className="mt-4 bg-white px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5e5e5e]">
          <div className="flex flex-wrap gap-3">
            <span>Resources</span>
            <span>Setup_Guide.pdf</span>
            <span>Key_Bindings.json</span>
          </div>
          <p className="mt-2 text-[#006533]">● System Ready</p>
        </section>

        <div className="mt-6 overflow-hidden rounded-sm bg-[#111827]">
          <div className="h-44 bg-gradient-to-br from-[#111827] to-[#374151] p-4">
            <p className="mt-24 text-[10px] font-bold uppercase tracking-[0.16em] text-[#af101a]">Preview</p>
            <h3 className="text-4xl font-black text-white">Module Overview</h3>
          </div>
        </div>
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
