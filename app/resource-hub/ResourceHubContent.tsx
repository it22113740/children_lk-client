"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getAgeGroupOption, getAudienceOption } from "@/lib/audience-config";
import type { PublicResource } from "@/lib/resources-api";

function DocIcon() {
  return (
    <svg
      className="h-10 w-10 text-sky-500 sm:h-12 sm:w-12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
}

function ResourceCard({ resource }: { resource: PublicResource }) {
  const shortDesc =
    resource.shortDescription.slice(0, 15) +
    (resource.shortDescription.length > 15 ? "…" : "");
  const audience = getAudienceOption(resource.targetAudience);
  const ageGroup = getAgeGroupOption(resource.ageGroup);
  return (
    <Link href={`/resource-hub/${resource._id}`}>
      <article className="flex flex-col rounded-2xl border border-sky-200/60 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-sans text-lg font-medium text-sky-900 sm:text-xl">
              {resource.name}
            </h3>
            {(audience || ageGroup) && (
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-sky-600">
                {ageGroup && (
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden>{ageGroup.icon}</span>
                    {ageGroup.label}
                  </span>
                )}
                {audience && (
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden>{audience.icon}</span>
                    {audience.label}
                  </span>
                )}
              </div>
            )}
            <p className="mt-1 text-sm text-sky-700">{shortDesc}</p>
          </div>
          <div className="shrink-0">
            {resource.picture ? (
              <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                <Image
                  src={resource.picture}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
            ) : (
              <DocIcon />
            )}
          </div>
        </div>
        {resource.tags && resource.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-sky-100 pt-4">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}

type Props = {
  initialResources: PublicResource[];
  filterTags: string[];
};

export function ResourceHubContent({ initialResources, filterTags }: Props) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return initialResources.filter((r) => {
      const matchSearch =
        !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        (r.shortDescription &&
          r.shortDescription.toLowerCase().includes(search.toLowerCase()));
      const matchTag =
        !selectedTag || (r.tags && r.tags.includes(selectedTag));
      return matchSearch && matchTag;
    });
  }, [initialResources, search, selectedTag]);

  return (
    <>
      {/* Search bar - centered */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <input
            id="resource-search"
            type="search"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-sky-200 bg-white px-4 py-3 text-sky-900 placeholder:text-sky-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>
      </section>

      {/* First 5 tags as filter options */}
      <section className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2">
          {filterTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                setSelectedTag(selectedTag === tag ? null : tag)
              }
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedTag === tag
                  ? "bg-sky-500 text-white"
                  : "bg-sky-100 text-sky-700 hover:bg-sky-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Resource cards */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <p className="text-center text-sky-600">
              No resources match your search.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((resource) => (
                <ResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
