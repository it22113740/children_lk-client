export type Resource = {
  id: string;
  title: string;
  age: string;
  description: string;
  tags: string[];
  organization: {
    name: string;
    description: string;
    logo?: string | null;
  };
  downloadCount: number;
  fileUrl?: string | null; // for Download button
};

const MOCK_RESOURCES: Resource[] = [
  {
    id: "1",
    title: "Reading Guide for Kids",
    age: "5-8 years",
    description:
      "Fun stories and exercises to build reading skills. This guide includes activities for phonics, comprehension, and vocabulary. Perfect for parents and teachers.",
    tags: ["Reading", "Kids", "Education"],
    organization: {
      name: "Children Learning Foundation",
      description: "We create free educational resources for children and families.",
      logo: null,
    },
    downloadCount: 1247,
    fileUrl: null,
  },
  {
    id: "2",
    title: "Math Activity Pack",
    age: "6-10 years",
    description:
      "Hands-on activities and worksheets for math. Covers counting, addition, subtraction, and simple geometry. Designed for home or classroom use.",
    tags: ["Math", "Education", "Activities"],
    organization: {
      name: "EduKids Sri Lanka",
      description: "Promoting quality education and learning materials for kids.",
      logo: null,
    },
    downloadCount: 892,
    fileUrl: null,
  },
  {
    id: "3",
    title: "Science Experiments at Home",
    age: "8-12 years",
    description:
      "Safe and easy experiments using household items. Each experiment includes steps, safety notes, and discussion questions for parents.",
    tags: ["Science", "Kids", "Activities"],
    organization: {
      name: "Science for All",
      description: "Making science fun and accessible for every child.",
      logo: null,
    },
    downloadCount: 2103,
    fileUrl: null,
  },
  {
    id: "4",
    title: "Art & Craft Ideas",
    age: "4-9 years",
    description:
      "Step-by-step craft projects for children. Uses simple materials like paper, glue, and recyclables. Great for creativity and fine motor skills.",
    tags: ["Art", "Craft", "Kids"],
    organization: {
      name: "Creative Minds",
      description: "Inspiring creativity through art and craft resources.",
      logo: null,
    },
    downloadCount: 1564,
    fileUrl: null,
  },
  {
    id: "5",
    title: "Emotional Learning Guide",
    age: "5-11 years",
    description:
      "Activities to support social and emotional growth. Includes exercises for feelings, empathy, and resilience. For use at home or in schools.",
    tags: ["Education", "Wellbeing", "Kids"],
    organization: {
      name: "Children Learning Foundation",
      description: "We create free educational resources for children and families.",
      logo: null,
    },
    downloadCount: 734,
    fileUrl: null,
  },
];

export function getResourceById(id: string): Resource | undefined {
  return MOCK_RESOURCES.find((r) => r.id === id);
}
