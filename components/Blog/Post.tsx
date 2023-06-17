import Link from "@components/Link";

const Post = ({ keyword, description, support, url, title }: any) => {
  const supportBackground =
    support === "full"
      ? "bg-green-1000"
      : support === "partial"
      ? "bg-yellow-1000"
      : "bg-red-1000";
  return (
    <Link
      href={`/${url}/`}
      className="flex relative h-full text-left text-white rounded-md group bg-bg-500"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 scale-x-[1.01] scale-y-[1.02] bg-gradient -z-10 blur-sm" />
      {support && (
        <div
          className={`rounded-l-md px-[2px] text-tiny flex items-center ${supportBackground}`}
        >
          <span className="rotate-180 [text-orientation:mixed] [writing-mode:tb-rl]">
            {support} support
          </span>
        </div>
      )}
      <div className="p-3 leading-snug">
        <div className="font-bold">{keyword || title || ""}</div>
        <div className="text-tiny">{description}</div>
      </div>
    </Link>
  );
};

export default Post;
