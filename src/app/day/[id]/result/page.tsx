import { redirect } from "next/navigation";
import { dayContent } from "@/lib/mock-data/course";

export default async function DayResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ answer?: string }>;
}) {
  const { id } = await params;
  const { answer } = await searchParams;
  const dayId = Number(id);
  const content = dayContent[dayId];

  if (!content) {
    redirect("/course");
  }

  const q = answer ?? "";
  if (!q) {
    redirect(`/day/${dayId}/lesson`);
  }
  redirect(`/day/${dayId}/lesson?answer=${encodeURIComponent(q)}&submitted=1`);
}
