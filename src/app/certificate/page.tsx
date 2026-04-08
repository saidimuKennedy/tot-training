import Link from "next/link";
import { BottomNav } from "@/components/course/bottom-nav";

type CertPreview = {
  learnerName: string;
  courseTitle: string;
  completionDate: string;
  certificateId: string;
  issuedBy: string;
  cardImageUrl: string | null;
};

async function getCertPreview(): Promise<CertPreview> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/certificate/preview`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load certificate preview");
  return res.json() as Promise<CertPreview>;
}

export default async function CertificatePage() {
  const cert = await getCertPreview();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f3f3] pb-24">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="text-[#d32f2f]">◼</span>
          <span>KRA ACADEMY</span>
        </div>
      </header>
      <div className="px-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5e5e5e]">[ Credential // Verified ]</p>
        <h1 className="mt-2 text-5xl font-black leading-[0.9] tracking-tight">ACADEMIC ACHIEVEMENT</h1>
        <p className="mt-2 text-[11px] uppercase tracking-[0.1em] text-[#646464]">Issued on: {cert.completionDate}</p>

        {cert.cardImageUrl ? (
          <div className="mt-5 overflow-hidden border border-[#e4beba]/40 bg-white p-2 shadow-[0_18px_36px_rgba(27,27,27,0.08)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cert.cardImageUrl} alt={`Certificate of Completion for ${cert.learnerName}`} className="w-full" />
          </div>
        ) : (
          <div className="mt-5 border border-[#e4beba]/40 bg-white p-2 shadow-[0_18px_36px_rgba(27,27,27,0.08)]">
            <div className="border-[10px] border-[#f3f3f3] bg-white p-5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold">KRA ACADEMY</span>
                <span className="font-bold">{cert.certificateId}</span>
              </div>
              <p className="mt-6 text-center text-xl italic text-[#646464]">This certifies that</p>
              <p className="mt-2 text-center text-5xl font-black leading-none">{cert.learnerName}</p>
              <p className="mt-6 text-center text-lg text-[#646464]">has successfully completed the professional curriculum</p>
              <p className="mx-auto mt-6 inline-block bg-[#af101a] px-4 py-2 text-center text-sm font-bold uppercase tracking-[0.12em] text-white">
                {cert.courseTitle}
              </p>
              <div className="mt-8 flex items-end justify-between text-[10px] uppercase text-[#646464]">
                <span>Director of Studies</span>
                <span>Issued by {cert.issuedBy}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 bg-[#f3f3f3] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5e5e5e]">Credential Details</p>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between border-b border-[#e2e2e2] pb-2"><span>Grade</span><span className="font-bold text-[#006533]">DISTINCTION (A+)</span></div>
            <div className="flex justify-between border-b border-[#e2e2e2] pb-2"><span>Credits</span><span className="font-bold">45.0 ECTS</span></div>
            <div className="flex justify-between border-b border-[#e2e2e2] pb-2"><span>Expires</span><span className="font-bold">NEVER</span></div>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <button className="inline-flex w-full items-center justify-center bg-[#af101a] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white">
            ↗ Send to WhatsApp
          </button>
          <button className="inline-flex w-full items-center justify-center border border-[#af101a] bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#af101a]">
            ⇩ Download Certificate
          </button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#646464]">
          This document is a verifiable digital certificate. Any person can verify the authenticity of this credential by scanning the QR code or using the unique ID above.
        </p>

        <div className="mt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5e5e5e]">Related Milestones</p>
          <div className="mt-2 space-y-2">
            <div className="bg-white p-3 text-xs"><p className="font-bold">TOP 5% OF CLASS</p><p className="mt-1 text-[#646464]">Ranked within top percentile for practical lab assessments.</p></div>
            <div className="bg-white p-3 text-xs"><p className="font-bold">LAB EXCELLENCE</p><p className="mt-1 text-[#646464]">Achieved 100% score in hardening module.</p></div>
            <div className="bg-white p-3 text-xs"><p className="font-bold">SPEED RECORD</p><p className="mt-1 text-[#646464]">Completed all modules ahead of schedule.</p></div>
          </div>
        </div>
        <Link href="/course" className="mt-4 inline-flex text-xs font-medium text-[#5e5e5e]">← Back to course</Link>
      </div>
      <BottomNav active="awards" />
    </main>
  );
}
