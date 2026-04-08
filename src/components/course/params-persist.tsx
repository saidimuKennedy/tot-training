"use client";

import { useEffect } from "react";

type Props = {
  participantName: string;
  waTo: string;
};

/** Saves participant identity to localStorage so it survives navigation across pages. */
export function ParamsPersist({ participantName, waTo }: Props) {
  useEffect(() => {
    if (participantName) localStorage.setItem("participantName", participantName);
    if (waTo) localStorage.setItem("waTo", waTo);
  }, [participantName, waTo]);

  return null;
}
