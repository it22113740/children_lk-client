import Image from "next/image";
import Link from "next/link";
import { fetchAllEvents, formatEventDateTime } from "@/lib/events-api";

function EventCard({
  id,
  title,
  dateTime,
  location,
  coverImage,
}: {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  coverImage?: string | null;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-sky-200/60 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[16/10] w-full bg-sky-100">
        {coverImage ? (
          <Image
            src={coverImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sky-400">
            <span className="text-sm font-medium">Image placeholder</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <h3 className="font-sans text-lg font-medium text-sky-900 sm:text-xl">
          {title}
        </h3>
        <p className="flex items-center gap-2 text-sm text-sky-700">
          <span aria-hidden>🗓️</span>
          {dateTime}
        </p>
        <p className="flex items-center gap-2 text-sm text-sky-700">
          <span aria-hidden>📍</span>
          {location}
        </p>
        <div className="mt-auto pt-2">
          <Link
            href={`/events/${id}`}
            className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600"
          >
            View Event
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function EventsPage() {
  const events = await fetchAllEvents();

  return (
    <main className="font-sans">
      {/* Hero: heading left, placeholder image right; downward wave at bottom */}
      <section className="events-hero-wave-wrap bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-stretch md:justify-between">
          <div className="flex flex-1 items-center">
            <h1 className="text-3xl font-medium text-sky-900 sm:text-4xl md:text-5xl">
              Events
            </h1>
          </div>
          <div className="flex shrink-0 items-center justify-center md:w-80 lg:w-96">
            <div className="flex aspect-video w-full max-w-md items-center justify-center rounded-2xl bg-sky-100 text-sky-500">
              <span className="text-base font-medium sm:text-lg">
                Image placeholder
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Event cards */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {events.length === 0 ? (
            <p className="text-center text-sky-600">No events at the moment.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  id={event._id}
                  title={event.name}
                  dateTime={formatEventDateTime(event)}
                  location={event.location}
                  coverImage={event.coverImage}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
