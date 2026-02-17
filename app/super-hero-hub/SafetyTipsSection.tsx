const SAFETY_TIPS = [
  {
    icon: "🚨",
    title: "Real Emergency Only",
    description:
      "Only call emergency numbers when there's a real danger or urgent need for help.",
  },
  {
    icon: "📍",
    title: "Know Your Location",
    description:
      "Try to know where you are so you can tell the emergency operator your location.",
  },
  {
    icon: "💬",
    title: "Stay Calm & Clear",
    description:
      "Speak clearly and calmly when calling. Tell them what happened and where you are.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Tell a Trusted Adult",
    description:
      "Always tell a parent, teacher, or another trusted adult when you need help.",
  },
];

export function SafetyTipsSection() {
  return (
    <section className="border-t border-sky-200/60 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="text-2xl" aria-hidden>
              🛡️
            </span>
            <h2 className="text-2xl font-bold text-sky-900 sm:text-3xl">
              Safety Tips from Our Heroes
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-sky-700">
            Learn how to stay safe and when to call for help from our emergency
            superheroes!
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY_TIPS.map((tip, idx) => (
            <article
              key={idx}
              className="flex flex-col rounded-xl border border-sky-200/60 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 text-center text-3xl" aria-hidden>
                {tip.icon}
              </div>
              <h3 className="mb-2 text-center font-semibold text-sky-900">
                {tip.title}
              </h3>
              <p className="text-center text-sm leading-relaxed text-sky-600">
                {tip.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
