import { renderHypecardBase64 } from "@/lib/integrations/hypecards/client";

function sanitizeFilePart(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const participantName = searchParams.get("participantName")?.trim() || "JOHN MWANGI";
  const completionDate = "April 2026";
  const certificateId = "KRA-TOT-26-00142";
  try {
    const rendered = await renderHypecardBase64({
      templateName: "cert",
      variables: {
        name: participantName,
        id: certificateId,
        date: completionDate,
      },
    });

    const fileBase = sanitizeFilePart(participantName) || "participant";
    const filename = `certificate-${fileBase}.png`;
    const pngBuffer = Buffer.from(rendered.image, "base64");

    return new Response(pngBuffer, {
      status: 200,
      headers: {
        "Content-Type": rendered.mimeType || "image/png",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Certificate download failed";
    const unauthorized = message.includes("(401)");
    const timeout = message.includes("ETIMEDOUT") || message.includes("fetch failed");
    const status = unauthorized ? 502 : timeout ? 504 : 500;

    return Response.json(
      {
        error: "certificate_download_failed",
        message: unauthorized
          ? "Certificate service rejected credentials. Please check analytics API key configuration."
          : timeout
            ? "Certificate service timed out. Please retry."
            : "Certificate generation failed. Please retry.",
      },
      { status },
    );
  }
}

