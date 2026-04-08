"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BottomNav } from "@/components/course/bottom-nav";
import type { QuizQuestion } from "@/lib/mock-data/course";
import { courseData } from "@/lib/mock-data/course";

type LessonWithQuizProps = {
  dayId: number;
  dayTitle: string;
  durationLabel: string;
  why: string;
  videoUrl: string;
  posterUrl: string;
  takeaways: string[];
  quiz: QuizQuestion;
  /** From `/day/:id/result?answer=` redirect */
  initialAnswer?: string;
  initialSubmitted?: boolean;
  /** From old `/day/:id/quiz` redirect — scroll to quiz block */
  focusQuiz?: boolean;
};

export function LessonWithQuiz({
  dayId,
  dayTitle,
  durationLabel,
  why,
  videoUrl,
  posterUrl,
  takeaways,
  quiz,
  initialAnswer,
  initialSubmitted,
  focusQuiz,
}: LessonWithQuizProps) {
  const router = useRouter();
  const nextDayId = dayId + 1;
  const hasNext = courseData.days.some((d) => d.id === nextDayId);
  const completedDays = Math.min(dayId, courseData.days.length);
  const percent = Math.round((completedDays / courseData.days.length) * 100);

  const fromResult =
    Boolean(initialSubmitted && initialAnswer !== undefined && initialAnswer !== "");

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(fromResult);
  const [correct, setCorrect] = useState<boolean | null>(() =>
    fromResult ? initialAnswer === quiz.correctOptionId : null,
  );
  const focusedQuizSection = useRef(false);

  useEffect(() => {
    if (!fromResult) return;
    router.replace(`/day/${dayId}/lesson`, { scroll: false });
  }, [fromResult, dayId, router]);

  useEffect(() => {
    if (!focusQuiz || focusedQuizSection.current) return;
    focusedQuizSection.current = true;
    requestAnimationFrame(() => {
      document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    router.replace(`/day/${dayId}/lesson`, { scroll: false });
  }, [focusQuiz, dayId, router]);

  function handleQuizSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAnswer) return;
    const isCorrect = selectedAnswer === quiz.correctOptionId;
    setCorrect(isCorrect);
    setModalOpen(true);
  }

  return (
    <>
      <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] pb-24">
        <header className="bg-[#1b1b1b] px-4 pt-3 text-white">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <span className="text-[#d32f2f]">◼</span>
              <span>KRA ACADEMY</span>
            </div>
            <Link
              href="/course"
              className="inline-flex items-center border border-white/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
            >
              Back
            </Link>
          </div>
          <div className="h-1 bg-[#e2e2e2]">
            <div
              className="h-1 bg-[#006533]"
              style={{ width: `${Math.round((dayId / courseData.days.length) * 100)}%` }}
            />
          </div>
        </header>

        <div className="p-4">
          <video
            controls
            preload="metadata"
            poster={posterUrl}
            className="h-[300px] w-full rounded-sm bg-black object-cover shadow-[0_18px_30px_rgba(0,0,0,0.25)]"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

          <section className="mt-7 border-l-2 border-[#af101a] pl-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#af101a]">
              Module {String(dayId).padStart(2, "0")} · {durationLabel}
            </p>
            <h1 className="mt-2 text-3xl font-black leading-[0.95] tracking-tight">{dayTitle.toUpperCase()}</h1>
            <p className="mt-4 text-sm leading-relaxed text-[#5e5e5e]">{why}</p>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl font-bold uppercase tracking-[0.08em]">KEY TAKEAWAYS</h3>
            <div className="mt-4 space-y-4">
              {takeaways.map((takeaway, idx) => (
                <div key={takeaway} className="bg-white p-5 shadow-[0_8px_22px_rgba(27,27,27,0.05)]">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[#af101a]">◈</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#c6c6c6]">
                      [ KEY #{idx + 1} ]
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#5e5e5e]">{takeaway}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="quiz" className="mt-10 scroll-mt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5e5e5e]">
              Course Archive &gt; Module {String(dayId).padStart(2, "0")} &gt; Evaluation
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">QUICK CHECK · DAY {dayId}</h2>
            <form
              className="mt-6 rounded-xl bg-white p-4 shadow-[0_12px_28px_rgba(27,27,27,0.06)]"
              onSubmit={handleQuizSubmit}
            >
              <div className="border-l-4 border-[#af101a] pl-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5e5e5e]">[ Question 01 ]</p>
                <h3 className="mt-5 text-3xl font-bold leading-tight">{quiz.prompt}</h3>
                <div className="mt-6 space-y-3">
                  {quiz.options.map((o) => (
                    <label
                      key={o.id}
                      className={`flex cursor-pointer items-center gap-4 border p-3 ${
                        selectedAnswer === o.id
                          ? "border-[#af101a] bg-[#fff2f0]"
                          : "border-[#e2e2e2] bg-[#f3f3f3]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={o.id}
                        checked={selectedAnswer === o.id}
                        onChange={() => setSelectedAnswer(o.id)}
                      />
                      <span className="flex h-9 w-9 items-center justify-center border border-[#d1d5db] bg-white font-bold">
                        {o.id}
                      </span>
                      <span className="text-sm font-medium">{o.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-[#e2e2e2] pt-5">
                <p className="mt-2 text-sm text-[#5e5e5e]">Required for Module Completion. No negative marking.</p>
                <button
                  type="submit"
                  disabled={!selectedAnswer}
                  className="mt-5 inline-flex w-full items-center justify-center bg-[#af101a] px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit Answer
                </button>
              </div>
            </form>
          </section>
        </div>

        <div className="fixed bottom-20 left-0 right-0 mx-auto w-full max-w-[390px] border-t border-[#e2e2e2] bg-white/95 px-4 py-3">
          {hasNext && (
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.12em] text-[#5e5e5e]">
              Next up: Day {nextDayId}
            </p>
          )}
        </div>
        <BottomNav active="courses" />
      </main>

      {modalOpen && correct !== null && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quiz-result-title"
        >
          <div className="max-h-[90vh] w-full max-w-[390px] overflow-y-auto bg-[#f3f3f3] p-5 shadow-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center bg-[#2a8d55] shadow-[0_12px_24px_rgba(0,0,0,0.2)]">
              <span className="text-3xl text-white">✓</span>
            </div>
            <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#5e5e5e]">
              Journey Stage [01]
            </p>
            <h2 id="quiz-result-title" className="mt-1 text-center text-3xl font-black tracking-tight">
              Day {dayId} Complete
            </h2>

            <div className="mt-5 bg-white p-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5e5e5e]">Overall Progress</p>
              <p className="mt-4 text-4xl font-black">{percent}%</p>
              <div className="mx-auto mt-3 h-2 w-full rounded-full bg-[#e2e2e2]">
                <div className="h-2 rounded-full bg-[#006533]" style={{ width: `${percent}%` }} />
              </div>
              <p className="mt-3 text-xs text-[#5e5e5e]">
                {completedDays} / {courseData.days.length} DAYS COMPLETED
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {hasNext ? (
                <Link
                  href={`/day/${nextDayId}`}
                  className="inline-flex w-full items-center justify-center bg-[#af101a] px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white"
                >
                  Continue to Day {nextDayId} →
                </Link>
              ) : (
                <Link
                  href="/certificate"
                  className="inline-flex w-full items-center justify-center bg-[#af101a] px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white"
                >
                  View Certificate
                </Link>
              )}
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="inline-flex w-full items-center justify-center px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#5e5e5e]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
