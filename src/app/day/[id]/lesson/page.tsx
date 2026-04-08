import Link from "next/link";
import { BottomNav } from "@/components/course/bottom-nav";
import { dayContent } from "@/lib/mock-data/course";
import { cloudinaryPosterUrl, cloudinaryVideoUrl } from "@/lib/media/cloudinary";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dayId = Number(id);
  const content = dayContent[dayId];

  if (!content) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] p-4">
        <p className="text-sm text-muted-foreground">Lesson data missing.</p>
      </main>
    );
  }

  const videoUrl = cloudinaryVideoUrl(content.videoPublicId);
  const posterUrl = cloudinaryPosterUrl(content.videoPublicId);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] pb-24">
      <header className="bg-[#1b1b1b] px-4 pt-3 text-white">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <span className="text-[#d32f2f]">◼</span>
            <span>KRA ACADEMY</span>
          </div>
          <Link href={`/day/${dayId}`} className="text-xl">×</Link>
        </div>
        <div className="h-1 bg-[#e2e2e2]">
          <div className="h-1 w-2/3 bg-[#006533]" />
        </div>
      </header>

      <div className="p-4">
        <video controls preload="metadata" poster={posterUrl} className="w-full rounded-sm bg-black shadow-[0_18px_30px_rgba(0,0,0,0.25)]">
          <source src={videoUrl} type="video/mp4" />
        </video>

        <section className="mt-7 border-l-2 border-[#af101a] pl-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#af101a]">Lecture 04.2</p>
          <h1 className="mt-2 text-5xl font-black leading-[0.9] tracking-tight">PROTOCOLS &amp; ENCRYPTION</h1>
          <p className="mt-4 text-sm leading-relaxed text-[#5e5e5e]">
            Advanced analysis of cryptographic handshakes and data integrity validation in decentralized networks.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-3xl font-bold uppercase tracking-[0.08em]">WHAT TO REMEMBER</h3>
          <div className="mt-4 space-y-4">
            {content.takeaways.map((takeaway, idx) => (
              <div key={takeaway} className="bg-white p-5 shadow-[0_8px_22px_rgba(27,27,27,0.05)]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[#af101a]">◈</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#c6c6c6]">[ KEY #{idx + 1} ]</span>
                </div>
                <p className="text-3xl font-bold tracking-tight">{takeaway.split(".")[0]}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5e5e5e]">{takeaway}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-20 left-0 right-0 mx-auto w-full max-w-[390px] border-t border-[#e2e2e2] bg-white/95 px-4 py-3">
        <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.12em] text-[#5e5e5e]">
          <span>← Prev Lesson</span>
          <span>Next Up 04.3 Asymmetric Logic</span>
        </div>
        <Link href={`/day/${dayId}/quiz`} className="inline-flex w-full items-center justify-center bg-[#af101a] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white">
          Take Quick Quiz ⚡
        </Link>
      </div>
      <BottomNav active="courses" />
    </main>
  );
}
