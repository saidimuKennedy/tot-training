import type { ReactNode } from "react";
import { WEBVIEW_MAX_WIDTH } from "@/lib/theme";
import Link from "next/link";

type Props = {
  children: ReactNode;
  title?: string;
  backHref?: string;
};

export function AppShell({ children, title, backHref }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/40 to-slate-100">
      <div className="mx-auto w-full px-4 pb-24 pt-4" style={{ maxWidth: WEBVIEW_MAX_WIDTH }}>
        {(title || backHref) && (
          <header className="mb-5 flex items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-[0_12px_30px_rgba(2,6,23,0.06)] backdrop-blur">
            {backHref ? (
              <Link href={backHref} className="text-sm font-medium text-slate-500 hover:text-primary">
                ← Back
              </Link>
            ) : (
              <span />
            )}
            {title ? <h1 className="text-sm font-bold tracking-tight text-slate-800">{title}</h1> : <span />}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}
