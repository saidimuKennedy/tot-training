import Link from "next/link";
import { StatusChip } from "@/components/course/ui";
import { BottomNav } from "@/components/course/bottom-nav";
import { ParamsPersist } from "@/components/course/params-persist";
import { courseData, getCompletion, type DayStatus } from "@/lib/mock-data/course";

function statusLabel(status: DayStatus) {
  if (status === "in_progress") return "In Progress";
  if (status === "completed") return "Completed";
  return "Not Started";
}

function statusTone(status: DayStatus): "gray" | "amber" | "green" {
  if (status === "in_progress") return "amber";
  if (status === "completed") return "green";
  return "gray";
}

type CourseHomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CourseHomePage({ searchParams }: CourseHomePageProps) {
  const params = (await searchParams) ?? {};
  const participantName = typeof params.participantName === "string" ? params.participantName.trim() : "";
  const waTo = [params.waTo, params.phone, params.msisdn].find(
    (v): v is string => typeof v === "string" && v.trim().length > 0,
  )?.trim() ?? "";
  const completion = getCompletion(courseData.days);
  return (
    <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f9f9f9] px-3 pb-24 pt-3 text-[#1b1b1b]">
      <ParamsPersist participantName={participantName} waTo={waTo} />
      <header className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-[#2c2c2c]">
        <span className="text-[#d32f2f]">◼</span>
        <span>KRA ACADEMY</span>
      </header>

      <section className="relative mb-6 overflow-hidden rounded-sm bg-[#ba1a20] px-4 py-6 text-white shadow-[0_12px_30px_rgba(27,27,27,0.16)]">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative">
          <span className="inline-block bg-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em]">
            Certification Track
          </span>
          <h1 className="mt-3 text-5xl font-extrabold leading-[0.9] tracking-tight">
            Turnover
            <br />
            Tax
            <br />
            Made
            <br />
            Simple
          </h1>
          <p className="mt-4 max-w-[230px] text-[11px] leading-relaxed text-[#fff2f0]">
            Master the essentials of TOT compliance for small businesses through our structured three-day intensive program.
          </p>
          <Link
            href="/day/1"
            className="mt-5 inline-flex rounded-sm bg-[#1b1b1b] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
          >
            Start Learning
          </Link>
        </div>
      </section>

      <section className="mb-5 border-b border-[#e4beba]/40 pb-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#646464]">[01] Learning_Path</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight">Your Learning Journey</h2>
      </section>

      <section className="space-y-3">
        {courseData.days.map((day) => (
          <Link key={day.id} href={`/day/${day.id}`} className={`block p-4 ${day.id === 3 ? "bg-[#f3f3f3]/80 opacity-80" : "bg-white shadow-[0_12px_24px_rgba(27,27,27,0.06)]"} ${day.id === 2 ? "border-l-4 border-l-[#af101a]" : ""}`}>
            <div className="mb-6 flex items-start justify-between">
              <span className={`text-3xl font-bold tracking-tight ${day.id === 2 ? "text-[#af101a]" : "text-[#dadada]"}`}>
                {String(day.id).padStart(2, "0")}
              </span>
              {day.id === 3 ? (
                <span className="text-xs text-[#5e5e5e]">🔒</span>
              ) : (
                <StatusChip label={statusLabel(day.status).toUpperCase()} tone={statusTone(day.status)} />
              )}
            </div>
            <p className="text-base font-bold">{day.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#5e5e5e]">
              {day.id === 1
                ? "Understanding eligibility criteria and the iTax registration process for Turnover Tax."
                : day.id === 2
                  ? "Daily record keeping, invoice management, and calculating your gross monthly turnover."
                  : "Step-by-step guide to filing returns on iTax and payment procedures before the 20th."}
            </p>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-[#5e5e5e]">
              ⏱ {day.id === 1 ? "45 mins" : day.id === 2 ? "120 mins" : "90 mins"}
            </p>
            {day.id === 1 ? <div className="mt-3 h-[2px] w-full bg-[#006533]" /> : null}
          </Link>
        ))}
      </section>

      <footer className="mt-6 rounded bg-white px-3 py-2 text-xs font-medium text-[#5e5e5e]">
        {completion.completedDays} of {completion.totalDays} days complete
      </footer>
      <BottomNav active="courses" />
    </main>
  );
}
