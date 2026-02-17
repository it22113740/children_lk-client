"use client";

import { useState } from "react";
import { registerDownload } from "@/lib/resources-api";

type Props = {
  resourceId: string;
  documentPublicId: string;
  documentUrl: string;
};

export function DownloadButton({
  resourceId,
  documentPublicId,
  documentUrl,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await registerDownload(resourceId, documentPublicId);
      window.open(documentUrl, "_blank", "noopener,noreferrer");
    } catch {
      // Still open the URL if register fails (e.g. network)
      window.open(documentUrl, "_blank", "noopener,noreferrer");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-600 disabled:opacity-70"
    >
      <svg
        className="h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {loading ? "Downloading…" : "Download"}
    </button>
  );
}
