/**
 * Target Audience & Age Group config: icons, labels, descriptions.
 * API values are normalized (lowercase, trimmed) for lookup.
 */

export type AudienceOption = {
  icon: string;
  label: string;
  description: string;
};

export type AgeGroupOption = {
  icon: string;
  label: string;
  description: string;
};

export const TARGET_AUDIENCE: Record<string, AudienceOption> = {
  children: {
    icon: "👶",
    label: "Children",
    description: "Content designed for children",
  },
  professionals: {
    icon: "👨‍💼",
    label: "Professionals",
    description: "Content for people who work with children",
  },
};

export const AGE_GROUP: Record<string, AgeGroupOption> = {
  "1-5": {
    icon: "🍼",
    label: "1-5 years",
    description: "Toddlers and early childhood",
  },
  "1-5 years": {
    icon: "🍼",
    label: "1-5 years",
    description: "Toddlers and early childhood",
  },
  "5-10": {
    icon: "🎒",
    label: "5-10 years",
    description: "Elementary school age",
  },
  "5-10 years": {
    icon: "🎒",
    label: "5-10 years",
    description: "Elementary school age",
  },
  "11-15": {
    icon: "📚",
    label: "11-15 years",
    description: "Middle school and early teens",
  },
  "11-15 years": {
    icon: "📚",
    label: "11-15 years",
    description: "Middle school and early teens",
  },
  "15-18": {
    icon: "🎓",
    label: "15-18 years",
    description: "High school teenagers",
  },
  "15-18 years": {
    icon: "🎓",
    label: "15-18 years",
    description: "High school teenagers",
  },
  "above 18": {
    icon: "🎯",
    label: "Above 18 years",
    description: "Young adults and above",
  },
  "above 18 years": {
    icon: "🎯",
    label: "Above 18 years",
    description: "Young adults and above",
  },
  "18+": {
    icon: "🎯",
    label: "Above 18 years",
    description: "Young adults and above",
  },
};

function normalize(value: string | undefined): string {
  if (!value || typeof value !== "string") return "";
  return value.toLowerCase().trim();
}

export function getAudienceOption(
  targetAudience: string | undefined
): AudienceOption | null {
  const key = normalize(targetAudience);
  if (!key) return null;
  return TARGET_AUDIENCE[key] ?? null;
}

export function getAgeGroupOption(
  ageGroup: string | undefined
): AgeGroupOption | null {
  const key = normalize(ageGroup);
  if (!key) return null;
  if (AGE_GROUP[key]) return AGE_GROUP[key];
  // Match "1-5" when API sends "1 - 5" or similar
  const normalized = key.replace(/\s+/g, "");
  return AGE_GROUP[normalized] ?? null;
}
