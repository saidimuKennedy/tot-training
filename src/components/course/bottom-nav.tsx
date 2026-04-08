import Link from "next/link";

type Tab = "home" | "courses" | "awards" | "profile";

const tabs: Array<{ id: Tab; label: string; href: string; icon: string }> = [
  { id: "home", label: "HOME", href: "/course", icon: "⌂" },
  { id: "courses", label: "COURSES", href: "/course", icon: "▤" },
  { id: "awards", label: "AWARDS", href: "/certificate", icon: "✦" },
  { id: "profile", label: "PROFILE", href: "#", icon: "●" },
];

export function BottomNav({ active = "courses" }: { active?: Tab }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto h-20 w-full max-w-[390px] border-t border-black/5 bg-white px-4">
      <div className="flex h-full items-center justify-around">
        {tabs.map((tab) => {
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
      </div>
    </nav>
  );
}
