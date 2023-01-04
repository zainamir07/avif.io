import Link from "@components/Link";
import sortBy from "lodash/sortBy";
import { FC } from "react";

interface Source {
  href: string;
  text: string;
}

interface SourcesProps {
  sources: string[];
}

const Sources: FC<SourcesProps> = ({ sources }) => {
  let sourceObjects: Source[] = sources.map((href) => {
    let text = new URL(`https://${href}`).hostname.replace(/^www\./, "");
    return { href, text };
  });
  sourceObjects = sortBy(sourceObjects, (s) => s.text);
  return (
    <>
      <h5 className="inline-block mt-4 font-bold rounded-md">Sources</h5>
      <ol className="flex flex-wrap gap-1 text-red-700 text-tiny">
        {sourceObjects.map((source: Source) => (
          <cite
            key={source.text}
            className="py-0 px-1 not-italic rounded-md bg-red-1000"
          >
            <Link text={source.text} href={source.href} />
          </cite>
        ))}
      </ol>
    </>
  );
};

export default Sources;
