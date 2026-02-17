import Image from "next/image";
import { notFound } from "next/navigation";
import { getAgeGroupOption, getAudienceOption } from "@/lib/audience-config";
import {
  fetchResourceById,
  fetchResourceDownloads,
} from "@/lib/resources-api";
import { DocumentPreview } from "./DocumentPreview";
import { DownloadButton } from "./DownloadButton";

function DocIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "h-12 w-12 text-sky-500 sm:h-14 sm:w-14"}
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

export default async function SingleResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resource = await fetchResourceById(id);
  if (!resource) notFound();

  const org = resource.organizationId;
  const firstDoc = resource.documents?.[0];
  const audience = getAudienceOption(resource.targetAudience);
  const ageGroup = getAgeGroupOption(resource.ageGroup);

  const downloadsData = await fetchResourceDownloads(resource._id);
  const totalDownloads = downloadsData?.total ?? 0;

  return (
    <main className="font-sans">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top: title left, DOC icon / picture right */}
        <section className="flex items-center justify-between gap-6">
          <h1 className="text-3xl font-medium text-sky-900 sm:text-4xl lg:text-5xl">
            {resource.name}
          </h1>
          <div className="shrink-0">
            {resource.picture ? (
              <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                <Image
                  src={resource.picture}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            ) : (
              <DocIcon />
            )}
          </div>
        </section>

        {/* Divider */}
        <hr className="my-8 border-sky-200/60" />

        {/* 1/2 and 1/2 */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Left half: Age group, Target audience, Description, Tags, Organization card */}
          <div className="flex flex-col gap-6">
            {(audience || ageGroup || resource.ageGroup || resource.targetAudience) && (
              <div className="grid gap-4 sm:grid-cols-2">
                {(ageGroup || resource.ageGroup) && (
                  <div className="flex gap-4 rounded-xl border border-sky-200/60 bg-sky-50/50 p-4">
                    <span className="text-3xl" aria-hidden>
                      {ageGroup?.icon ?? "📋"}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-xs font-semibold uppercase tracking-wide text-sky-500">
                        Age group
                      </h2>
                      <p className="mt-0.5 font-medium text-sky-900">
                        {ageGroup?.label ?? resource.ageGroup}
                      </p>
                      {ageGroup?.description && (
                        <p className="mt-1 text-sm text-sky-600">
                          {ageGroup.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {(audience || resource.targetAudience) && (
                  <div className="flex gap-4 rounded-xl border border-sky-200/60 bg-sky-50/50 p-4">
                    <span className="text-3xl" aria-hidden>
                      {audience?.icon ?? "👥"}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-xs font-semibold uppercase tracking-wide text-sky-500">
                        Target audience
                      </h2>
                      <p className="mt-0.5 font-medium text-sky-900">
                        {audience?.label ?? resource.targetAudience}
                      </p>
                      {audience?.description && (
                        <p className="mt-1 text-sm text-sky-600">
                          {audience.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div>
              <h2 className="text-sm font-medium text-sky-500">Description</h2>
              <p className="mt-2 leading-relaxed text-sky-700">
                {resource.shortDescription}
              </p>
            </div>
            {resource.tags && resource.tags.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-sky-500">Tags</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Organization card: 1/3 logo, 2/3 name + description */}
            <div className="rounded-2xl border border-sky-200/60 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-sky-100 sm:h-20 sm:w-20">
                  {org.logo ? (
                    <Image
                      src={org.logo}
                      alt=""
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-sky-400">
                      {org.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sky-900">{org.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-sky-600">
                    {org.shortDescription ?? org.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right half: DOC Card - preview, Download button */}
          <div className="flex flex-col">
            <div className="rounded-2xl border border-sky-200/60 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="sr-only">Document</h2>
              {/* Preview by document type: pdf, word, powerpoint, audio, video */}
              <div className="min-h-[280px] w-full overflow-hidden rounded-xl">
                {firstDoc ? (
                  <DocumentPreview document={firstDoc} />
                ) : resource.picture ? (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={resource.picture}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 rounded-xl bg-sky-50 text-sky-400">
                    <DocIcon className="h-16 w-16 text-sky-300" />
                    <span className="text-sm font-medium">
                      No document to preview
                    </span>
                  </div>
                )}
              </div>
              {/* Download button: POST to register, then open document */}
              {firstDoc ? (
                <>
                  <DownloadButton
                    resourceId={resource._id}
                    documentPublicId={firstDoc.publicId}
                    documentUrl={firstDoc.url}
                  />
                  <p className="mt-3 text-center text-sm text-sky-600">
                    {totalDownloads.toLocaleString()} downloads
                  </p>
                </>
              ) : (
                <p className="mt-4 text-center text-sm text-sky-500">
                  No document available
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
