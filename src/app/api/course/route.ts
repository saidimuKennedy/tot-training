import { NextResponse } from "next/server";
import { courseData, getCompletion } from "@/lib/mock-data/course";

export async function GET() {
  return NextResponse.json({
    ...courseData,
    completion: getCompletion(courseData.days),
  });
}
