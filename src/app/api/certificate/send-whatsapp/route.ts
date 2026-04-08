import { NextResponse } from "next/server";

const ANALYTICS_API_URL = process.env.ANALYTICS_API_URL;
const ANALYTICS_INTERNAL_API_KEY = process.env.ANALYTICS_INTERNAL_API_KEY;
const ANALYTICS_TENANT_ID = process.env.ANALYTICS_TENANT_ID;

export async function POST(request: Request) {
  const formData = await request.formData();
  const participantName = String(formData.get("participantName") || "").trim();
  const whatsappNumber = String(formData.get("whatsappNumber") || "").trim();
  const certificateImageUrl = String(formData.get("certificateImageUrl") || "").trim();

  if (!participantName || !certificateImageUrl) {
    return NextResponse.json(
      { success: false, error: "participantName and certificateImageUrl are required" },
      { status: 400 },
    );
  }
  if (!whatsappNumber) {
    const redirectUrl = new URL("/certificate", request.url);
    redirectUrl.searchParams.set("participantName", participantName);
    redirectUrl.searchParams.set("waError", "missing-recipient");
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }

  if (!ANALYTICS_API_URL || !ANALYTICS_INTERNAL_API_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing ANALYTICS_API_URL or ANALYTICS_INTERNAL_API_KEY",
      },
      { status: 500 },
    );
  }

  const message = `Congratulations ${participantName}\n\nYou have successfully completed the TOT training`;

  const response = await fetch(
    `${ANALYTICS_API_URL.replace(/\/$/, "")}/api/dashboard/whatsapp/send-stateless`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANALYTICS_INTERNAL_API_KEY,
      },
      body: JSON.stringify({
        ...(ANALYTICS_TENANT_ID ? { tenantId: ANALYTICS_TENANT_ID } : {}),
        to: whatsappNumber,
        message,
        imageUrl: certificateImageUrl,
      }),
    },
  );

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    return NextResponse.json(
      { success: false, error: result.error || "Failed to send WhatsApp message" },
      { status: 502 },
    );
  }

  const redirectUrl = new URL("/certificate", request.url);
  redirectUrl.searchParams.set("participantName", participantName);
  redirectUrl.searchParams.set("waSent", "1");
  redirectUrl.searchParams.set("waTo", whatsappNumber);
  return NextResponse.redirect(redirectUrl, { status: 303 });
}

