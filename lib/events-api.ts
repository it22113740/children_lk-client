import { API_BASE } from "./api-base";

export type PublicEvent = {
  _id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  tags: string[];
  registrationLink?: string;
  coverImage?: string;
  coverImagePublicId?: string;
  organizationId?: { _id: string; name: string };
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

function formatEventDate(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const dateStr = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  if (!endDate) return `${dateStr} · ${timeStr}`;
  const end = new Date(endDate);
  const sameDay =
    start.toDateString() === end.toDateString();
  if (sameDay) {
    const endTime = end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr} · ${timeStr} – ${endTime}`;
  }
  const endDateStr = end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const endTime = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${dateStr} · ${timeStr} – ${endDateStr} · ${endTime}`;
}

export function formatEventDateTime(event: PublicEvent): string {
  return formatEventDate(event.startDate, event.endDate);
}

export async function fetchAllEvents(): Promise<PublicEvent[]> {
  const res = await fetch(`${API_BASE}/api/public/events`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchEventById(id: string): Promise<PublicEvent | null> {
  const res = await fetch(`${API_BASE}/api/public/events/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export function getRelatedEvents(
  allEvents: PublicEvent[],
  currentEvent: PublicEvent,
  limit = 3
): PublicEvent[] {
  const tagSet = new Set(currentEvent.tags || []);
  return allEvents
    .filter(
      (e) => e._id !== currentEvent._id && (e.tags || []).some((t) => tagSet.has(t))
    )
    .slice(0, limit);
}
