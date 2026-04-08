import { redirect } from "next/navigation";

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/day/${id}/lesson?section=quiz`);
}
