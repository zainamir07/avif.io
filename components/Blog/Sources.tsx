/* eslint-disable @next/next/no-img-element */
import Link from "@components/Link";
import { useState, useEffect, useMemo } from "react";

interface LinkPreviewData {
  title: string;
  url: string;
  favicons: string[];
}

interface FancySourceProps {
  url: string;
}

function sortFavicons(favicons: string[]): string[] {
  return favicons.sort((a: string, b: string) => {
    if (a.includes("16x16")) return -1;
    if (b.includes("16x16")) return 1;
    if (a.includes("32x32")) return -1;
    if (b.includes("32x32")) return 1;
    return 0;
  });
}

function FancySource(props: FancySourceProps) {
  const [linkPreviewData, setLinkPreviewData] =
    useState<LinkPreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState(false);

  const { url } = props;

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        const res = await fetch(`/api/linkPreview?url=${url}`);
        const data = await res.json();
        const sortedFavicons = sortFavicons(data.linkPreviewData.favicons);
        setLinkPreviewData({
          ...data.linkPreviewData,
          favicons: sortedFavicons,
        });
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [url]);

  const content = useMemo(() => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return null;
    }

    if (!linkPreviewData) {
      return null;
    }

    if (error == false && linkPreviewData) {
      return (
        <>
          {imageError ? (
            <div className="w-5 h-5 bg-white bg-opacity-5 rounded-md" />
          ) : (
            <img
              loading="lazy"
              decoding="async"
              className="w-5 h-5 transition-all duration-100 ease-out"
              src={linkPreviewData.favicons[0]}
              alt={linkPreviewData.title}
              onError={() => setImageError(true)}
            />
          )}
          <div className="flex relative z-10 flex-col gap-1 w-full">
            <div className="font-bold font-gilroy capitalize">
              {linkPreviewData.title.toLowerCase()}
            </div>
            <div className="leading-snug text-tiny">
              {new URL(linkPreviewData.url).hostname.replace("www.", "")}
            </div>
          </div>
          <img
            className="relative z-50 self-center p-4 w-4 h-4 rounded-md invert bg-black/5 group-hover:rotate-45"
            src="/assets/arrow-up-right-from-square-solid.svg"
            alt="Arrow"
          />
          <div className="opacity-0 group-hover:opacity-20">
            <img
              loading="lazy"
              decoding="async"
              className="absolute inset-0 z-0 w-full shadow-md opacity-0 transition-all duration-500 -translate-x-24 -translate-y-24 group-hover:opacity-40 group-hover:scale-150 group-hover:translate-x-12 group-hover:translate-y-24 animate-fancypulse blur-3xl shadow-black"
              src={linkPreviewData.favicons[0]}
              alt={linkPreviewData.title}
            />
          </div>
        </>
      );
    }
  }, [loading, error, linkPreviewData, imageError]);

  return (
    <Link
      className="block overflow-hidden relative z-50 rounded-md border border-white border-opacity-5 md:overflow-visible isolate group bg-white/5"
      href={url}
    >
      <div className="flex relative flex-wrap gap-4 p-4 rounded-md md:overflow-hidden md:flex-nowrap items-center">
        {content}
      </div>
    </Link>
  );
}

interface SourcesProps {
  sources: string[];
}

export default function Sources(props: SourcesProps) {
  const [sortedSources, setSortedSources] =
    useState<{ url: string; text: string; title: string }[]>();

  useEffect(() => {
    const fetchTitles = async () => {
      const sourcesWithTitles = await Promise.all(
        props.sources.map(async (href) => {
          try {
            const url = `https://${href}`;
            const text = new URL(url).hostname.replace(/^www\./, "");

            const response = await fetch(`/api/linkPreview?url=${url}`);
            const data = await response.json();
            const title = data.linkPreviewData.title;

            return { url, text, title };
          } catch (error) {
            console.error("Error fetching link preview:", error);
            return null;
          }
        })
      );

      // Filter out the sources that produced an error
      const validSources = sourcesWithTitles.filter(
        (source) => source !== null
      );

      const nonNullSources: { url: string; text: string; title: string }[] =
        validSources as any[];

      // Sort the sources based on the domain name and the presence of "Cloudflare" in the title
      const sorted = nonNullSources.sort((a, b) => {
        if (!a || !b) {
          return 0;
        }

        if (a.title.includes("Cloudflare") && !b.title.includes("Cloudflare")) {
          return 1;
        } else if (
          !a.title.includes("Cloudflare") &&
          b.title.includes("Cloudflare")
        ) {
          return -1;
        } else if (
          a.title.includes("moment...") &&
          !b.title.includes("moment...")
        ) {
          return 1;
        } else if (
          !a.title.includes("moment...") &&
          b.title.includes("moment...")
        ) {
          return -1;
        } else {
          return a.text.localeCompare(b.text);
        }
      });

      setSortedSources(sorted);
    };
    fetchTitles();
  }, [props.sources]);

  return (
    <div>
      <h3 className="m-0 mt-8">Sources</h3>

      <ol className="flex flex-col gap-2 mt-6">
        {sortedSources &&
          sortedSources.map((source, index) => (
            <FancySource key={index} url={source.url} />
          ))}
      </ol>
    </div>
  );
}
