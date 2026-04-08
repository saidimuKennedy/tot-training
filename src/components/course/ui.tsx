import type { ReactNode } from "react";

export function PrimaryButton({ href, children }: { href?: string; children: ReactNode }) {
  const classes =
    "inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-emerald-500 px-4 py-3.5 text-sm font-bold text-primary-foreground shadow-[0_12px_24px_rgba(0,102,51,0.28)] transition hover:brightness-110";
  if (href) return <a className={classes} href={href}>{children}</a>;
  return <button className={classes} type="button">{children}</button>;
}

export function OutlineButton({ href, children }: { href?: string; children: ReactNode }) {
  const classes =
    "inline-flex w-full items-center justify-center rounded-xl border border-primary/50 bg-white px-4 py-3.5 text-sm font-bold text-primary transition hover:bg-emerald-50";
  if (href) return <a className={classes} href={href}>{children}</a>;
  return <button className={classes} type="button">{children}</button>;
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2.5 w-full rounded-full bg-slate-200/80">
      <div className="h-2.5 rounded-full bg-gradient-to-r from-primary to-emerald-400" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function StatusChip({ label, tone }: { label: string; tone: "gray" | "amber" | "green" }) {
  const toneClass =
    tone === "green" ? "bg-green-100 text-green-700 border border-green-200" : tone === "amber" ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-slate-100 text-slate-600 border border-slate-200";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClass}`}>{label}</span>;
}
