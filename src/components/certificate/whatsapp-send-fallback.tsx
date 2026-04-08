"use client";

import { useState } from "react";

type Props = {
  participantName: string;
  certificateImageUrl: string;
};

export function WhatsAppSendFallback({ participantName, certificateImageUrl }: Props) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSend() {
    const cleaned = phone.trim();
    if (!cleaned) return;
    setStatus("sending");

    const body = new FormData();
    body.set("participantName", participantName);
    body.set("whatsappNumber", cleaned);
    body.set("certificateImageUrl", certificateImageUrl);

    try {
      const res = await fetch("/api/certificate/send-whatsapp", { method: "POST", body });
      if (res.redirected || res.ok) {
        setStatus("sent");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Failed to send");
        setStatus("error");
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Network error");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="text-[11px] font-medium text-[#006533]">
        Certificate sent to WhatsApp ({phone}).
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#5e5e5e]">
        WhatsApp Number
      </label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="e.g. 254704696287"
        className="w-full border border-[#d8d8d8] px-3 py-2 text-sm outline-none focus:border-[#af101a]"
      />
      {status === "error" && (
        <p className="text-[11px] text-[#8b1e24]">{errorMsg}</p>
      )}
      <button
        onClick={handleSend}
        disabled={status === "sending" || !phone.trim()}
        className="inline-flex w-full items-center justify-center bg-[#af101a] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "↗ Send to WhatsApp"}
      </button>
    </div>
  );
}
