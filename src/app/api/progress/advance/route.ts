import { NextResponse } from "next/server";
import { courseData } from "@/lib/mock-data/course";

export async function POST(request: Request) {
  const body = (await request.json()) as { currentDay?: number };
  const currentDay = Number(body.currentDay || 1);
  const totalDays = courseData.days.length;
  const completedDays = Math.min(currentDay, totalDays);
  const nextDay = completedDays + 1;

  return NextResponse.json({
    completedDays,
    totalDays,
    nextDayRoute: nextDay <= totalDays ? `/day/${nextDay}` : undefined,
    certificateReady: completedDays >= totalDays,
  });
}
