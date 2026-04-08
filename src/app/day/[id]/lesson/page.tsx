import { LessonWithQuiz } from "@/components/course/lesson-with-quiz";
import { courseData, dayContent } from "@/lib/mock-data/course";
import { cloudinaryPosterUrl, cloudinaryVideoUrl } from "@/lib/media/cloudinary";

type LessonPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ answer?: string; submitted?: string; section?: string }>;
};

export default async function LessonPage({ params, searchParams }: LessonPageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const dayId = Number(id);
  const day = courseData.days.find((d) => d.id === dayId);
  const content = dayContent[dayId];

  if (!day || !content) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] p-4">
        <p className="text-sm text-muted-foreground">Lesson data missing.</p>
      </main>
    );
  }

  const videoUrl = cloudinaryVideoUrl(content.videoPublicId);
  const posterUrl = cloudinaryPosterUrl(content.videoPublicId);

  return (
    <LessonWithQuiz
      dayId={dayId}
      dayTitle={day.title}
      durationLabel={day.durationLabel}
      why={content.why}
      videoUrl={videoUrl}
      posterUrl={posterUrl}
      takeaways={content.takeaways}
      quiz={content.quiz}
      initialAnswer={sp.answer}
      initialSubmitted={sp.submitted === "1"}
      focusQuiz={sp.section === "quiz"}
    />
  );
}
