"use client";

import type { ResourceDocument } from "@/lib/resources-api";

function DocIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
}

function WordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-16 w-16 text-blue-600">
      <path d="M23.004 1.5q.41 0 .703.293t.293.703v19.008q0 .41-.293.703t-.703.293H6.996q-.41 0-.703-.293T6 21.504V18H.996q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6H6V2.496q0-.41.293-.703t.703-.293zM6 6v12h15V6zm2.496 10.5l1.5-6 1.324 4.5 1.324-4.5 1.5 6zm4.5-6h2.004l1.172 4.5 1.336-4.5h1.664l1.336 4.5 1.172-4.5h2.004v6h-1.5v-4.172l-1.336 4.172h-1.328l-1.336-4.172V16.5h-1.5z" />
    </svg>
  );
}

function PowerPointIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-16 w-16 text-orange-500">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zm-2 9h4v1h-2v3h2v1h-2v2h-2v-7zm6 0h-2v1h2v2h-2v1h2v2h2v-2h2v-1h-2v-2h2v-1z" />
    </svg>
  );
}

function AudioIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-16 w-16 text-sky-500">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-16 w-16 text-sky-500">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function getDocType(type: string): "pdf" | "word" | "powerpoint" | "audio" | "video" | null {
  const t = type?.toLowerCase() ?? "";
  if (t === "pdf" || t.includes("pdf")) return "pdf";
  if (t === "word" || t.includes("doc")) return "word";
  if (t === "powerpoint" || t.includes("ppt") || t.includes("powerpoint")) return "powerpoint";
  if (t === "audio" || t.includes("audio") || t.includes("mp3") || t.includes("wav") || t.includes("ogg")) return "audio";
  if (t === "video" || t.includes("video") || t.includes("mp4") || t.includes("webm")) return "video";
  return null;
}

export function DocumentPreview({ document: doc }: { document: ResourceDocument }) {
  const type = getDocType(doc.type);

  if (type === "pdf") {
    return (
      <div className="flex h-full min-h-[320px] w-full flex-col rounded-xl bg-sky-50">
        <iframe
          src={`${doc.url}#toolbar=0`}
          title={doc.name}
          className="h-full min-h-[320px] w-full flex-1 rounded-xl border-0"
        />
      </div>
    );
  }

  if (type === "audio") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-sky-50 p-6">
        <AudioIcon />
        <p className="text-sm font-medium text-sky-700">Audio</p>
        <audio controls src={doc.url} className="w-full max-w-md">
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="flex flex-col rounded-xl bg-sky-50">
        <video controls className="aspect-video w-full rounded-xl" src={doc.url}>
          Your browser does not support the video element.
        </video>
      </div>
    );
  }

  if (type === "word") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-sky-50 p-8">
        <WordIcon />
        <p className="text-sm font-medium text-sky-700">Word document</p>
        <p className="max-w-full truncate text-center text-xs text-sky-500">{doc.name}</p>
      </div>
    );
  }

  if (type === "powerpoint") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-sky-50 p-8">
        <PowerPointIcon />
        <p className="text-sm font-medium text-sky-700">Presentation</p>
        <p className="max-w-full truncate text-center text-xs text-sky-500">{doc.name}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-sky-50 p-8">
      <DocIcon className="h-16 w-16 text-sky-400" />
      <p className="text-sm font-medium text-sky-700">Document</p>
      <p className="max-w-full truncate text-center text-xs text-sky-500">{doc.name}</p>
    </div>
  );
}
