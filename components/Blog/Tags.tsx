import Link from "@components/Link";
import { useMemo } from "react";

export interface TagsProps {
  tags: string[];
}

export default function Tags(props: TagsProps) {
  const sortedTags = useMemo(() => {
    return props.tags.sort((a, b) => a.localeCompare(b));
  }, [props.tags]);

  const tags = sortedTags.map((text) => {
    let href = `google.com/search?q=site%3Aavif.io+${text.replace(
      /\s+/g,
      "+"
    )}`;
    return { href, text };
  });

  return (
    <div>
      <h3 className="m-0 mt-8">Tags</h3>
      <ol className="flex flex-wrap gap-1 gap-y-1 mt-6">
        {tags.map((source: any, index: any) => (
          <li key={index} className="inline-block">
            <Link
              className="inline-block py-1 px-2 bg-white bg-opacity-5 rounded-md hover:bg-opacity-10 text-default transition-all duration-300 ease-in-out"
              text={source.text}
              href={source.href}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
