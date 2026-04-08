"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  participantName: string;
  whatsappNumber: string;
  certificateImageUrl: string;
};

type Status = "idle" | "sending" | "sent" | "error";

export function WhatsAppAutoSend({ participantName, whatsappNumber, certificateImageUrl }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const resolvedPhone = whatsappNumber || localStorage.getItem("waTo") || "";
    const resolvedName = participantName || localStorage.getItem("participantName") || participantName;
    if (!resolvedPhone) {
      setStatus("error");
      setErrorMsg("No WhatsApp number available.");
      return;
    }

    setStatus("sending");

    const body = new FormData();
    body.set("participantName", resolvedName);
    body.set("whatsappNumber", resolvedPhone);
    body.set("certificateImageUrl", certificateImageUrl);

    fetch("/api/certificate/send-whatsapp", { method: "POST", body })
      .then(async (res) => {
        if (res.redirected || res.ok) {
          setStatus("sent");
        } else {
          const data = await res.json().catch(() => ({}));
          setErrorMsg(data.error || "Failed to send");
          setStatus("error");
        }
      })
      .catch((err) => {
        setErrorMsg(err?.message || "Network error");
        setStatus("error");
      });
  }, [participantName, whatsappNumber, certificateImageUrl]);

  if (status === "idle" || status === "sending") {
    return (
      <p className="text-[11px] text-[#5e5e5e]">
        {status === "sending" ? "Sending certificate to WhatsApp…" : "Preparing…"}
      </p>
    );
  }

  if (status === "sent") {
    return (
      <p className="text-[11px] font-medium text-[#006533]">
        Certificate sent to WhatsApp ({whatsappNumber}).
      </p>
    );
  }

  return (
    <p className="text-[11px] text-[#8b1e24]">
      WhatsApp send failed: {errorMsg}
    </p>
  );
}
