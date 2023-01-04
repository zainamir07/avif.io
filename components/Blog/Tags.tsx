import Link from "@components/Link";
import sortBy from "lodash/sortBy";
import { FC } from "react";

interface Tag {
  href: string;
  text: string;
}

interface TagsProps {
  tags: string[];
}

const Tags: FC<TagsProps> = ({ tags }) => {
  let tagObjects: Tag[] = tags.map((text) => {
    let href = `google.com/search?q=site%3Aavif.io+${text.replace(
      /\s+/g,
      "+"
    )}`;
    return { href, text };
  });
  tagObjects = sortBy(tagObjects, (s) => s.text);

  return (
    <>
      <h5 className="inline-block mt-4 font-bold rounded-md">Tags</h5>
      <ol className="flex flex-wrap gap-1 text-red-700 text-tiny">
        {tagObjects.map((tag: Tag) => (
          <li key={tag.text} className="py-0 px-1 rounded-md bg-red-1000">
            <Link text={tag.text} href={tag.href} />
          </li>
        ))}
      </ol>
    </>
  );
};

export default Tags;
