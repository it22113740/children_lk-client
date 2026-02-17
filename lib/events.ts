export type EventItem = {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  description: string;
  tags: string[];
  imagePlaceholder?: boolean;
};

export const EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Children's Art Workshop",
    dateTime: "Mar 15, 2025 · 10:00 AM",
    location: "Community Center, Colombo",
    description:
      "A creative workshop where children explore painting, drawing, and crafts. Our instructors help kids express themselves through art in a fun, supportive environment. All materials are provided.",
    tags: ["Art", "Workshop", "Kids"],
    imagePlaceholder: true,
  },
  {
    id: "2",
    title: "Storytelling & Reading Day",
    dateTime: "Mar 22, 2025 · 2:00 PM",
    location: "Central Library, Kandy",
    description:
      "Join us for an afternoon of stories and reading activities. Professional storytellers and volunteers will bring tales to life. Perfect for families and children who love books.",
    tags: ["Reading", "Storytelling", "Family"],
    imagePlaceholder: true,
  },
  {
    id: "3",
    title: "Science Fun for Kids",
    dateTime: "Apr 5, 2025 · 9:00 AM",
    location: "Science Museum, Colombo",
    description:
      "Hands-on science experiments and demonstrations designed for curious young minds. Learn about simple machines, nature, and fun physics in a safe and engaging way.",
    tags: ["Science", "Workshop", "Kids"],
    imagePlaceholder: true,
  },
  {
    id: "4",
    title: "Music & Movement",
    dateTime: "Apr 12, 2025 · 11:00 AM",
    location: "Community Center, Colombo",
    description:
      "Sing, dance, and play with rhythm and movement. This session combines music and physical activity to boost creativity and coordination for children of all ages.",
    tags: ["Music", "Kids", "Workshop"],
    imagePlaceholder: true,
  },
];

export function getEventById(id: string): EventItem | undefined {
  return EVENTS.find((e) => e.id === id);
}

export function getRelatedEvents(currentEvent: EventItem, limit = 3): EventItem[] {
  const tagSet = new Set(currentEvent.tags);
  return EVENTS.filter(
    (e) => e.id !== currentEvent.id && e.tags.some((t) => tagSet.has(t))
  ).slice(0, limit);
}
