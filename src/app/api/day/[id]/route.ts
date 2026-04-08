import { NextResponse } from "next/server";
import { courseData, dayContent } from "@/lib/mock-data/course";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dayId = Number(id);
  const day = courseData.days.find((d) => d.id === dayId);
  const content = dayContent[dayId];

  if (!day || !content) {
    return NextResponse.json({ error: "Day not found" }, { status: 404 });
  }

  return NextResponse.json({
    day,
    overview: content.overview,
    why: content.why,
    takeaways: content.takeaways,
    quiz: {
      id: content.quiz.id,
      prompt: content.quiz.prompt,
      options: content.quiz.options,
    },
  });
}
