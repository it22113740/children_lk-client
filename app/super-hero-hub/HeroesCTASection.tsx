export function HeroesCTASection() {
  return (
    <section className="border-t border-sky-200/60 bg-sky-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="text-3xl" aria-hidden>
            🦸
          </span>
          <h2 className="text-3xl font-bold text-sky-900 sm:text-4xl">
            Our Heroes Are Always Ready!
          </h2>
          <span className="text-3xl" aria-hidden>
            🦸
          </span>
        </div>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-sky-700">
          Remember, these emergency heroes are always here to help when you
          need them most. Stay safe, be smart, and don't hesitate to call when
          there's a real emergency!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="flex items-center gap-2 rounded-xl border-2 border-green-600 bg-white px-6 py-3 font-medium text-green-700 transition hover:bg-green-50">
            <span className="text-xl" aria-hidden>
              ⭐
            </span>
            Always Available
          </button>
          <button className="flex items-center gap-2 rounded-xl border-2 border-sky-600 bg-white px-6 py-3 font-medium text-sky-700 transition hover:bg-sky-50">
            <span className="text-xl" aria-hidden>
              ❤️
            </span>
            Here to Protect
          </button>
        </div>
      </div>
    </section>
  );
}
