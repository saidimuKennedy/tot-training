import { NextResponse } from "next/server";
import { renderHypecardUrl } from "@/lib/integrations/hypecards/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const participantName = searchParams.get("participantName")?.trim();

  const certData = {
    learnerName: participantName || "JOHN MWANGI",
    courseTitle: "Turnover Tax 3-Day Learning Course",
    completionDate: "May 2026",
    certificateId: "KRA-TOT-26-00142",
    issuedBy: "Kenya Revenue Authority",
  };

  let cardImageUrl: string | null = null;
  try {
    const rendered = await renderHypecardUrl({
      templateName: "cert",
      variables: {
        name: certData.learnerName,
        id: certData.certificateId,
        date: certData.completionDate,
      },
    });
    cardImageUrl = rendered.url;
  } catch (err) {
    // Degrade gracefully — certificate page still renders the HTML fallback
    console.error("[certificate/preview] hypecard render failed:", err);
  }

  return NextResponse.json({ ...certData, cardImageUrl });
}
