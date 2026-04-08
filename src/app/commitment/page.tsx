import Link from "next/link";
import { BottomNav } from "@/components/course/bottom-nav";

export default function CommitmentPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] pb-24">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="text-[#d32f2f]">◼</span>
          <span>KRA ACADEMY</span>
        </div>
      </header>

      <div className="px-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5e5e5e]">Module 01 • Orientation</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">My Commitment</h1>

        <section className="mt-6 bg-white p-5 shadow-[0_12px_28px_rgba(27,27,27,0.06)]">
          <p className="text-xl font-bold leading-tight">I&apos;m beginning my learning in Turnover Tax Made Simple.</p>
          <p className="mt-4 text-sm leading-relaxed text-[#5e5e5e]">
            I know learning can be hard, but I have the patience, determination, and discipline to reach my goals.
          </p>
        </section>

        <section className="mt-4 bg-[#1b1b1b] p-5 text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">Editorial Insight</p>
          <p className="mt-3 text-2xl italic leading-relaxed">
            &quot;For Kenya ToT compliance, the first technical step is confirming eligibility, then activating the ToT obligation correctly on iTax.&quot;
          </p>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#af101a]">Compliance actions</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
            <li>Ask KRA helpline</li>
            <li>Check iTax portal</li>
            <li>Re-watch the video</li>
            <li>Break it down</li>
            <li>Stay consistent</li>
          </ul>
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
          <div className="h-40 bg-gradient-to-br from-[#111827] to-[#374151] p-4">
            <p className="mt-20 text-[10px] font-bold uppercase tracking-[0.16em] text-[#af101a]">Preview</p>
            <h3 className="text-3xl font-black text-white">Commitment Locked In</h3>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 mx-auto w-full max-w-[390px] px-4">
        <Link
          href="/day/1"
          className="inline-flex w-full items-center justify-center  bg-[#af101a] px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_12px_24px_rgba(175,16,26,0.35)]"
        >
          Start the course ▶
        </Link>
      </div>
      <BottomNav active="courses" />
    </main>
  );
}
