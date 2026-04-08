import { NextResponse } from "next/server";
import { sendHypecardsEvent } from "@/lib/integrations/hypecards/mock";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    learnerId?: string;
    eventName?: "day_start" | "lesson_complete" | "quiz_submitted" | "course_completed" | "certificate_viewed";
    dayId?: number;
    metadata?: Record<string, string | number | boolean>;
  };

  if (!body.learnerId || !body.eventName) {
    return NextResponse.json({ error: "learnerId and eventName are required" }, { status: 400 });
  }

  const result = await sendHypecardsEvent({
    learnerId: body.learnerId,
    eventName: body.eventName,
    dayId: body.dayId,
    metadata: body.metadata,
  });

  return NextResponse.json(result);
}
