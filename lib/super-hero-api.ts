import { API_BASE } from "./api-base";

export type PublicSuperHero = {
  _id: string;
  name: string;
  icon: string;
  iconType: string;
  phone: string;
  shortDescription: string;
  organizationId?: {
    _id: string;
    name: string;
    shortDescription?: string;
    logo?: string;
  };
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function fetchSuperHeroes(): Promise<PublicSuperHero[]> {
  const res = await fetch(`${API_BASE}/api/public/super-hero/`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
