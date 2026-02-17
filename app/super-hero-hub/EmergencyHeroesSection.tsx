"use client";

import type { PublicSuperHero } from "@/lib/super-hero-api";

const COLOR_KEYS = [
  "blue",
  "red",
  "green",
  "purple",
  "orange",
  "pink",
  "teal",
  "indigo",
] as const;

const colorClasses: Record<
  (typeof COLOR_KEYS)[number],
  {
    bg: string;
    iconBg: string;
    text: string;
    button: string;
    number: string;
  }
> = {
  blue: {
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    text: "text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700",
    number: "text-blue-600",
  },
  red: {
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    text: "text-red-700",
    button: "bg-red-600 hover:bg-red-700",
    number: "text-red-600",
  },
  green: {
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    text: "text-green-700",
    button: "bg-green-600 hover:bg-green-700",
    number: "text-green-600",
  },
  purple: {
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
    text: "text-purple-700",
    button: "bg-purple-600 hover:bg-purple-700",
    number: "text-purple-600",
  },
  orange: {
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    text: "text-orange-700",
    button: "bg-orange-600 hover:bg-orange-700",
    number: "text-orange-600",
  },
  pink: {
    bg: "bg-pink-50",
    iconBg: "bg-pink-100",
    text: "text-pink-700",
    button: "bg-pink-600 hover:bg-pink-700",
    number: "text-pink-600",
  },
  teal: {
    bg: "bg-teal-50",
    iconBg: "bg-teal-100",
    text: "text-teal-700",
    button: "bg-teal-600 hover:bg-teal-700",
    number: "text-teal-600",
  },
  indigo: {
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    text: "text-indigo-700",
    button: "bg-indigo-600 hover:bg-indigo-700",
    number: "text-indigo-600",
  },
};

function SuperHeroCard({
  hero,
  colorKey,
}: {
  hero: PublicSuperHero;
  colorKey: (typeof COLOR_KEYS)[number];
}) {
  const colors = colorClasses[colorKey];

  function handleCall() {
    window.location.href = `tel:${hero.phone}`;
  }

  return (
    <article
      className={`flex flex-col rounded-2xl border-2 border-transparent ${colors.bg} p-5 shadow-sm transition hover:shadow-md`}
    >
      <div className="mb-4 flex items-center justify-center">
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full ${colors.iconBg} text-4xl`}
        >
          {hero.icon || "🦸"}
        </div>
      </div>
      <h3 className={`mb-2 text-center text-lg font-bold ${colors.text}`}>
        {hero.name}
      </h3>
      <div className="mb-2 text-center">
        <span className={`text-2xl font-bold ${colors.number} sm:text-3xl`}>
          {hero.phone}
        </span>
      </div>
      <div className="mb-3 flex items-center justify-center gap-1.5 text-sm text-green-700">
        <span>✓</span>
        <span>24/7</span>
      </div>
      <p className="mb-4 text-center text-sm text-sky-700">
        {hero.shortDescription}
      </p>
      <button
        onClick={handleCall}
        className={`${colors.button} flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition`}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call {hero.phone}
      </button>
    </article>
  );
}

type Props = { heroes: PublicSuperHero[] };

export function EmergencyHeroesSection({ heroes }: Props) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Banner/Hero Area */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-3xl" aria-hidden>
              🦸
            </span>
            <h2 className="text-3xl font-bold text-sky-900 sm:text-4xl">
              Emergency Heroes
            </h2>
            <span className="text-3xl" aria-hidden>
              🦸
            </span>
          </div>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-sky-700">
            When you need help, these superheroes are just one tap away!
            Emergency services are available 24/7 to keep you safe and protected.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-sky-600">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">⚡</span>
              <span>Instant Contact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600">🛡️</span>
              <span>Always Safe</span>
            </div>
          </div>
        </div>

        {/* Yellow Alert Box */}
        <div className="mb-10 flex gap-3 rounded-xl border-2 border-yellow-300 bg-yellow-50 p-4">
          <span className="text-2xl shrink-0" aria-hidden>
            ⚠️
          </span>
          <p className="text-sm font-medium text-yellow-900">
            Remember: Only call emergency numbers when you really need help.
            These heroes are here to protect and save lives!
          </p>
        </div>

        {/* Super Hero Cards from API */}
        {heroes.length === 0 ? (
          <p className="text-center text-sky-600">
            No superheroes available at the moment.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {heroes.map((hero, index) => (
              <SuperHeroCard
                key={hero._id}
                hero={hero}
                colorKey={COLOR_KEYS[index % COLOR_KEYS.length]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
