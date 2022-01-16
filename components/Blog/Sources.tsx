import sortBy from "lodash/sortBy";

export interface SourcesProps {
  sources: string[];
}

export default function Sources(props: SourcesProps) {
  let sources = props.sources.map((original) => {
    original = original.replace(/^https?:\/\//, "");
    let short = original.replace(/\/$/, "");
    const split = short.split(/[/]/);
    const a = split[0];
    const c = a.replace(/^www./, "");
    short = `${c}`;
    original = `https://${original}`;
    return { original, short };
  });
  sources = sortBy(sources, (s) => s.short);

  const listItems = sources.map((source: any, index: any) => (
    <li
      key={index}
      className="inline-block px-1 mr-1 text-red-700 rounded-md text-tiny bg-red-1000"
    >
      <a target="_blank" rel="noreferrer" href={source.original}>
        {source.short}
      </a>
    </li>
  ));

  return (
    <>
      <h5 className="inline-block py-1 px-2 mt-4 mb-0 font-bold rounded-md">
        Sources
      </h5>
      <ol>{listItems}</ol>
    </>
  );
}
