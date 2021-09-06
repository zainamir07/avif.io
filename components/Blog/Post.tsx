import * as React from "react";
import Link from "next/link";

const Post = ({
  slug,
  category,
  subcategory,
  url,
  keyword,
  description,
  support,
}: any) => {
  return (
    <Link href={slug ? `/blog/${category}/${slug}/` : `/` + url}>
      <a
        href={slug ? `/blog/${category}/${slug}/` : `/` + url}
        tabIndex={0}
        className={`p-2 cursor-pointer group ${support}`}
      >
        <div className="p-3 overflow-hidden h-full rounded-md bg-bg-300 relative">
          <div className="absolute bottom-0 right-0 z-0 bg-gradient w-3 h-3 transform rotate-300 scale-400 opacity-5 group-hover:opacity-100 group-hover:scale-2000 transition-all"></div>

          <div className="relative mb-2 flex">
            <div className="inline-flex items-center relative px-2 py-1 bg-bg-700 rounded-md text-tiny text-white mr-1">
              <span
                className="w-1 h-1 rounded-full inline-block mr-1"
                style={{
                  backgroundColor:
                    support == "full support" ? "#28b720" : "#b72028",
                }}
              ></span>
              {support}
            </div>
            <div className="relative px-2 py-1 bg-bg-700 rounded-md inline-flex text-tiny text-white mr-2">
              {subcategory}
            </div>
          </div>
          <div className="relative font-bold text-white mb-0">
            {keyword || keyword || ""}
          </div>

          <div className="relative text-tiny text-white">{description}</div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
