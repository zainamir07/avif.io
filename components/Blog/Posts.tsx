import Link from "next/link";

export default function BlogPosts(props: any) {
  const posts = props.posts;

  const listItems = posts.map(
    ({ data, slug, keyword, description, url }: any, index: any) => (
      <Link
        href={slug ? `/blog/${props.title}/${slug}/` : `/` + url}
        key={index}
      >
        <a
          href={slug ? `/blog/${props.title}/${slug}/` : `/` + url}
          tabIndex={0}
          className="p-2 cursor-pointer md:w-1/2 lg:w-1/3 group"
        >
          <div className="overflow-hidden relative p-3 h-full rounded-sm bg-bg-500">
            <div className="absolute right-0 bottom-0 z-0 w-4 h-3 transition-all transform scale-0 translate-x-4 translate-y-2 bg-gradient rotate-300 group-hover:scale-1500"></div>
            <div className="relative mb-1 ml-1 font-bold text-white">
              {data?.keyword || keyword || ""}
            </div>
            <div className="relative ml-1 text-white text-tiny">
              <p>{data?.description || description || ""}</p>
            </div>
          </div>
        </a>
      </Link>
    )
  );
  return (
    <>
      <h3
        className="mt-8 mb-6 ml-3 text-xl font-bold capitalize"
        id={props.title ? props.title : "related"}
      >
        {props.title ? props.title : "Related articles"}
      </h3>
      <div className="flex flex-wrap">{listItems}</div>
    </>
  );
}
