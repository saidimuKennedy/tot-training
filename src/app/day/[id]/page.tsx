import { AppShell } from "@/components/course/app-shell";
import { PrimaryButton } from "@/components/course/ui";
import { BottomNav } from "@/components/course/bottom-nav";
import { courseData, dayContent } from "@/lib/mock-data/course";
import Link from "next/link";

export default async function DayOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dayId = Number(id);
  const day = courseData.days.find((d) => d.id === dayId);
  const content = dayContent[dayId];

  if (!day || !content) {
    return (
      <AppShell title="Day not found" backHref="/course">
        <p className="text-sm text-muted-foreground">This day is not configured yet.</p>
      </AppShell>
    );
  }

  return (
    <AppShell title={`Day ${day.id} of ${courseData.days.length}`} backHref="/course">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-primary p-5 text-white shadow-[0_20px_40px_rgba(15,23,42,0.3)]">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-100">Day {day.id} Focus</p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{day.title}</h2>
        <p className="mt-1 text-sm text-emerald-50">{day.durationLabel}</p>
      </div>

      <section className="mt-4 rounded-2xl border border-white/70 bg-white p-5 shadow-[0_12px_26px_rgba(2,6,23,0.08)]">
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-800">What you&apos;ll learn today</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          {content.overview.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-slate-700">{content.why}</p>

      <div className="mt-6">
        <PrimaryButton href={`/day/${dayId}/lesson`}>Play Lesson</PrimaryButton>
      </div>
      <Link href="/course" className="mt-3 block text-center text-sm font-medium text-slate-500">
        Back to course
      </Link>
      <BottomNav active="courses" />
    </AppShell>
  );
}
