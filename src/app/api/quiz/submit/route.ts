import { NextResponse } from "next/server";
import { dayContent } from "@/lib/mock-data/course";

export async function POST(request: Request) {
  const body = (await request.json()) as { dayId?: number; answer?: string };
  const dayId = Number(body.dayId);
  const answer = body.answer;
  const content = dayContent[dayId];

  if (!content || !answer) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const correct = answer === content.quiz.correctOptionId;
  return NextResponse.json({
    correct,
    explanation: correct ? content.quiz.explanation : "Almost. The correct answer is iTax.",
    nextRoute: `/day/${dayId}/result?answer=${answer}`,
  });
}
