import { BottomNav } from "@/components/course/bottom-nav";
import { dayContent } from "@/lib/mock-data/course";

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dayId = Number(id);
  const content = dayContent[dayId];

  if (!content) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] p-4">
        <p className="text-sm text-muted-foreground">Quiz data missing.</p>
      </main>
    );
  }

  const q = content.quiz;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] pb-24">
      <header className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="text-[#d32f2f]">◼</span>
          <span>KRA ACADEMY</span>
        </div>
        <div className="text-xl text-[#5e5e5e]">⌕ 🔔</div>
      </header>
      <div className="px-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5e5e5e]">Course Archive &gt; Module 01 &gt; Evaluation</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">QUICK CHECK · DAY {dayId}</h1>
        <div className="mt-4 flex gap-3">
          <span className="bg-[#e8e8e8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5e5e5e]">Status // Active</span>
          <span className="bg-[#e8e8e8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5e5e5e]">Points // 100 XP</span>
        </div>

        <form className="mt-6 rounded-xl bg-white p-4 shadow-[0_12px_28px_rgba(27,27,27,0.06)]" action={`/day/${dayId}/result`} method="get">
          <div className="border-l-4 border-[#af101a] pl-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5e5e5e]">[ Question 01 ]</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight">{q.prompt}</h2>
            <div className="mt-6 space-y-3">
              {q.options.map((o) => (
                <label key={o.id} className="flex cursor-pointer items-center gap-4 border border-[#e2e2e2] bg-[#f3f3f3] p-3">
                  <input type="radio" name="answer" value={o.id} required />
                  <span className="flex h-9 w-9 items-center justify-center border border-[#d1d5db] bg-white font-bold">{o.id}</span>
                  <span className="text-sm font-medium">{o.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-[#e2e2e2] pt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5e5e5e]">Metadata // 0x442A</p>
            <p className="mt-2 text-sm text-[#5e5e5e]">Required for Module Completion. No negative marking.</p>
            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center bg-[#af101a] px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white">
              Submit Answer
            </button>
          </div>
        </form>
      </div>
      <BottomNav active="home" />
    </main>
  );
}
