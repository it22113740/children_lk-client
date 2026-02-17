import { API_BASE } from "./api-base";

/** Call from client to register a download (POST), then open the document URL yourself */
export async function registerDownload(
  resourceId: string,
  documentPublicId: string
): Promise<Response> {
  return fetch(`${API_BASE}/api/public/resources/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resourceId, documentPublicId }),
  });
}

export type ResourceDocument = {
  url: string;
  publicId: string;
  type: string;
  name: string;
};

export type PublicResource = {
  _id: string;
  name: string;
  shortDescription: string;
  picture?: string;
  picturePublicId?: string;
  documents: ResourceDocument[];
  tags: string[];
  ageGroup?: string;
  targetAudience?: string;
  organizationId: {
    _id: string;
    name: string;
    shortDescription?: string;
    logo?: string;
  };
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function fetchAllResources(): Promise<PublicResource[]> {
  const res = await fetch(`${API_BASE}/api/public/resources`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchResourceById(
  id: string
): Promise<PublicResource | null> {
  const res = await fetch(`${API_BASE}/api/public/resources/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export type ResourceDownloads = {
  resourceId: string;
  total: number;
  byDocument: { documentPublicId: string; count: number }[];
};

export async function fetchResourceDownloads(
  resourceId: string
): Promise<ResourceDownloads | null> {
  const res = await fetch(
    `${API_BASE}/api/public/resources/${resourceId}/downloads`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

/** First 5 unique tags across all resources for filter options */
export function getFirstFiveTags(resources: PublicResource[]): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const r of resources) {
    for (const tag of r.tags || []) {
      if (!seen.has(tag) && tags.length < 5) {
        seen.add(tag);
        tags.push(tag);
      }
    }
  }
  return tags;
}
