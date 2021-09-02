import * as React from "react";
import Link from "next/link";

const Post = ({ slug, category, url, keyword, description }: any) => {
  return (
    <Link href={slug ? `/blog/${category}/${slug}/` : `/` + url}>
      <a
        href={slug ? `/blog/${category}/${slug}/` : `/` + url}
        tabIndex={0}
        className="p-2 cursor-pointer group"
      >
        <div className="overflow-hidden h-full rounded-md bg-bg-300">
          <div className="p-3 bg-bg-500 group-hover:bg-gradient">
            <div className="font-bold text-white">
              #{keyword || keyword || ""}
            </div>
          </div>
          <div className="p-3 border-t-2 group-hover:text-white border-bg-700">
            <p>{description || description || ""}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
