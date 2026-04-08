"use client";

import Link from "next/link";
import { useState } from "react";
import { courseData } from "@/lib/mock-data/course";

type Tab = "home" | "courses" | "awards" | "days";

const linkTabs: Array<{ id: Exclude<Tab, "days">; label: string; href: string; icon: string }> = [
  { id: "home", label: "HOME", href: "/course", icon: "⌂" },
  { id: "courses", label: "COURSES", href: "/course", icon: "▤" },
  { id: "awards", label: "AWARDS", href: "/certificate", icon: "✦" },
];

export function BottomNav({ active = "courses" }: { active?: Tab }) {
  const [isDaysOpen, setIsDaysOpen] = useState(false);

  return (
    <>
      {isDaysOpen ? (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setIsDaysOpen(false)}>
          <div className="mx-auto flex h-full w-full max-w-[390px] items-end" onClick={(e) => e.stopPropagation()}>
            <div className="mb-20 w-full rounded-t-xl bg-white p-4 shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5e5e5e]">Choose Day</p>
              <div className="mt-3 space-y-2">
                {courseData.days.map((day) => (
                  <Link
                    key={day.id}
                    href={`/day/${day.id}`}
                    className="block rounded border border-[#e2e2e2] bg-[#f9f9f9] px-3 py-2 text-sm font-medium text-[#1b1b1b]"
                    onClick={() => setIsDaysOpen(false)}
                  >
                    Day {day.id}: {day.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto h-20 w-full max-w-[390px] border-t border-black/5 bg-white px-4">
        <div className="flex h-full items-center justify-around">
          {linkTabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex min-w-16 flex-col items-center justify-center rounded-md px-2 py-1 ${
                  isActive ? "bg-[#f3f3f3] text-[#af101a]" : "text-[#6b7280]"
                }`}
              >
                <span className="text-sm leading-none">{tab.icon}</span>
                <span className="mt-1 text-[10px] font-bold tracking-[0.12em]">{tab.label}</span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setIsDaysOpen((v) => !v)}
            className={`flex min-w-16 flex-col items-center justify-center rounded-md px-2 py-1 ${
              active === "days" || isDaysOpen ? "bg-[#f3f3f3] text-[#af101a]" : "text-[#6b7280]"
            }`}
          >
            <span className="text-sm leading-none">●</span>
            <span className="mt-1 text-[10px] font-bold tracking-[0.12em]">DAYS</span>
          </button>
        </div>
      </nav>
    </>
  );
}
