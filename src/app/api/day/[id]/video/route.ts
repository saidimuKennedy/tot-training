import { NextResponse } from "next/server";
import { dayContent } from "@/lib/mock-data/course";
import { cloudinaryPosterUrl, cloudinaryVideoUrl } from "@/lib/media/cloudinary";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dayId = Number(id);
  const content = dayContent[dayId];
  if (!content) {
    return NextResponse.json({ error: "Day video not found" }, { status: 404 });
  }

  return NextResponse.json({
    dayId,
    playbackUrl: cloudinaryVideoUrl(content.videoPublicId),
    posterUrl: cloudinaryPosterUrl(content.videoPublicId),
    durationSeconds: 20,
  });
}
