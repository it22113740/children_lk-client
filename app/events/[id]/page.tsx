import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchAllEvents,
  fetchEventById,
  formatEventDateTime,
  getRelatedEvents,
} from "@/lib/events-api";

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

export default async function SingleEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [event, allEvents] = await Promise.all([
    fetchEventById(id),
    fetchAllEvents(),
  ]);
  if (!event) notFound();

  const related = getRelatedEvents(allEvents, event);

  const dateTimeStr = formatEventDateTime(event);

  return (
    <main className="font-sans">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top: title/description/tags 3/4, cover + details 1/4 */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-medium text-sky-900 sm:text-5xl lg:text-6xl">
              {event.name}
            </h1>
            <p className="leading-relaxed text-sky-700">
              {event.description}
            </p>
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-sky-100">
              {event.coverImage ? (
                <Image
                  src={event.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sky-500">
                  <span className="text-base font-medium sm:text-lg">
                    Cover image placeholder
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-sky-200/60 bg-white p-4">
              <p className="flex items-center gap-2 text-sm text-sky-700">
                <span aria-hidden>🗓️</span>
                {dateTimeStr}
              </p>
              <p className="flex items-center gap-2 text-sm text-sky-700">
                <span aria-hidden>📍</span>
                {event.location}
              </p>
              <Link
                href={event.registrationLink || "#"}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-600"
                {...(event.registrationLink?.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                Book
              </Link>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="my-12 border-sky-200/60" />

        {/* Related Events */}
        <section className="pb-12">
          <h2 className="text-center text-2xl font-medium text-sky-900 sm:text-3xl">
            Related Events
          </h2>
          {related.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedEvent) => (
                <EventCard
                  key={relatedEvent._id}
                  id={relatedEvent._id}
                  title={relatedEvent.name}
                  dateTime={formatEventDateTime(relatedEvent)}
                  location={relatedEvent.location}
                  coverImage={relatedEvent.coverImage}
                />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-center text-sky-600">
              No related events at the moment.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
