import { fetchAllResources, getFirstFiveTags } from "@/lib/resources-api";
import { ResourceHubContent } from "./ResourceHubContent";

export default async function ResourceHubPage() {
  const resources = await fetchAllResources();
  const filterTags = getFirstFiveTags(resources);

  return (
    <main className="font-sans">
      {/* Hero: same as events - title left, image right; downward wave */}
      <section className="events-hero-wave-wrap bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-stretch md:justify-between">
          <div className="flex flex-1 items-center">
            <h1 className="text-3xl font-medium text-sky-900 sm:text-4xl md:text-5xl">
              Resource Hub
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

      <ResourceHubContent initialResources={resources} filterTags={filterTags} />
    </main>
  );
}
