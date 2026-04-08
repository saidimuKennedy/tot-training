import { AppShell } from "@/components/course/app-shell";
import { PrimaryButton } from "@/components/course/ui";

export default function CommitmentPage() {
  return (
    <AppShell title="My Commitment" backHref="/course">
      <div className="space-y-4 rounded-2xl border border-white/70 bg-white p-5 shadow-[0_12px_30px_rgba(2,6,23,0.08)]">
        <p className="text-base font-bold text-slate-900">I&apos;m beginning my learning in Turnover Tax Made Simple.</p>
        <p className="text-sm leading-relaxed text-slate-600">
          I know learning can be hard, but I have the patience, determination, and discipline to reach my goals.
        </p>
        <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-slate-50 p-4 text-sm">
          <p className="mb-2 font-semibold text-slate-800">When I&apos;m stuck, I&apos;ll find a solution.</p>
          <ul className="list-disc space-y-1 pl-5 text-slate-600">
            <li>Ask KRA helpline</li>
            <li>Check iTax portal</li>
            <li>Re-watch the video</li>
            <li>Break it down</li>
            <li>Stay consistent</li>
          </ul>
        </div>
      </div>
      <div className="mt-5">
        <PrimaryButton href="/day/1">Start the course</PrimaryButton>
      </div>
    </AppShell>
  );
}
