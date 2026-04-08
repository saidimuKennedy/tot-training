/**
 * Client for the analytics dashboard-api hypecard render endpoints.
 *
 * External websites call `render-stateless-url` (returns a public image URL)
 * or `render-stateless` (returns base64 PNG). Both endpoints require an
 * `x-api-key` header matching the analytics server's INTERNAL_API_KEY env var.
 */

const ANALYTICS_API_URL = process.env.ANALYTICS_API_URL;
const ANALYTICS_INTERNAL_API_KEY = process.env.ANALYTICS_INTERNAL_API_KEY;

export type RenderStatelessInput = {
  /** Template UUID — use this OR templateName */
  templateId?: string;
  /** Template name — use this OR templateId */
  templateName?: string;
  /** Variable values that get interpolated into template text blocks / QR */
  variables: Record<string, string>;
};

export type RenderUrlResult = {
  url: string;
  mimeType: string;
};

export type RenderBase64Result = {
  image: string;
  mimeType: string;
};

function getBaseUrl(): string {
  if (!ANALYTICS_API_URL) {
    throw new Error("ANALYTICS_API_URL is not set");
  }
  return ANALYTICS_API_URL.replace(/\/$/, "");
}

function getApiKey(): string {
  if (!ANALYTICS_INTERNAL_API_KEY) {
    throw new Error("ANALYTICS_INTERNAL_API_KEY is not set");
  }
  return ANALYTICS_INTERNAL_API_KEY;
}

/**
 * Renders a hypecard template and returns a public image URL.
 * Use this for certificates, social cards, etc. displayed in the browser.
 */
export async function renderHypecardUrl(
  input: RenderStatelessInput,
): Promise<RenderUrlResult> {
  const res = await fetch(
    `${getBaseUrl()}/api/dashboard/hypecard-templates/render-stateless-url`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": getApiKey(),
      },
      body: JSON.stringify(input),
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "(no body)");
    throw new Error(
      `Hypecard render failed (${res.status}): ${text}`,
    );
  }

  return res.json() as Promise<RenderUrlResult>;
}

/**
 * Renders a hypecard template and returns a base64-encoded PNG.
 * Use this for server-side processing where you don't need a public URL.
 */
export async function renderHypecardBase64(
  input: RenderStatelessInput,
): Promise<RenderBase64Result> {
  const res = await fetch(
    `${getBaseUrl()}/api/dashboard/hypecard-templates/render-stateless`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": getApiKey(),
      },
      body: JSON.stringify(input),
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "(no body)");
    throw new Error(
      `Hypecard render failed (${res.status}): ${text}`,
    );
  }

  return res.json() as Promise<RenderBase64Result>;
}
