import { NextResponse } from "next/server";
import { renderHypecardUrl } from "@/lib/integrations/hypecards/client";

export async function GET() {
  const certData = {
    learnerName: "JOHN MWANGI",
    courseTitle: "Turnover Tax 3-Day Learning Course",
    completionDate: "April 2026",
    certificateId: "KRA-TOT-2026-00142",
    issuedBy: "Kenya Revenue Authority",
  };

  let cardImageUrl: string | null = null;
  try {
    const rendered = await renderHypecardUrl({
      templateName: "cert",
      variables: {
        name: certData.learnerName,
        courseTitle: certData.courseTitle,
        completionDate: certData.completionDate,
        certificateId: certData.certificateId,
        issuedBy: certData.issuedBy,
      },
    });
    cardImageUrl = rendered.url;
  } catch (err) {
    // Degrade gracefully — certificate page still renders the HTML fallback
    console.error("[certificate/preview] hypecard render failed:", err);
  }

  return NextResponse.json({ ...certData, cardImageUrl });
}
