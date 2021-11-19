import Layout from "@components/Layout";
import Link from "@components/Link";
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import remarkSlug from "remark-slug";
import { postFilePaths, BLOG_POSTS_PATH } from "@utils/mdx";
import MDXComponents from "@components/MDXComponents";
import Ad from "@components/Blog/Ad";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const filePath = path.join(
    `${BLOG_POSTS_PATH}/faq`,
    `${ctx.params?.slug}.mdx`
  );
  const source = fs.readFileSync(filePath);
  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug, require("remark-code-titles")],
    },
    scope: data,
  });
  return {
    props: {
      frontMatter: {
        ...data,
      },
      source: mdxSource,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths(`${BLOG_POSTS_PATH}/faq`)
    .map((p) => p.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

interface Props {
  children: any;
  posts: any;
  frontMatter: any;
  source: any;
}

const contentTable = [
  ["What is an AVIF file?", "/faq/what-is-avif/"],
  ["What are the benefits of AVIF?", "/faq/avif-benefits/"],
  ["What is the downside of AVIF?", "/faq/avif-downsides/"],
  ["What is the goal of AVIF?", "/faq/avif-goal/"],
  ["Why AVIF?", "/faq/why-avif/"],
  ["What is AVIF used for?", "/faq/avif-use/"],
  ["Who created AVIF?", "/faq/avif-creator/"],
  ["How was AVIF created?", "/faq/avif-creation/"],
  ["What is the technology stack behind AVIF?", "/faq/avif-technologies/"],
  ["Is AVIF based on other formats?", "/faq/avif-other-formats/"],
  ["Is AVIF open source?", "/faq/avif-opensource/"],
  ["Does AVIF have patents?", "/faq/avif-patents/"],
  ["What features does AVIF support?", "/faq/avif-features/"],
  ["Is AVIF a lossless or lossy format?", "/faq/avif-loss/"],
  ["Is AVIF lossless?", "/faq/avif-lossless/"],
  ["Is AVIF lossy?", "/faq/avif-lossy/"],
  ["Does AVIF support transparency?", "/faq/avif-transparency/"],
  ["Does AVIF support animation?", "/faq/avif-animation/"],
  ["Does AVIF support SDR?", "/faq/avif-sdr/"],
  ["Does AVIF support HDR?", "/faq/avif-hdr/"],
  ["What is the highest megapixel count for AVIF?", "/faq/avif-megapixel/"],
  ["Does AVIF support Wide Color Gamut?", "/faq/avif-wcg/"],
  ["What color bit depth does AVIF support?", "/faq/avif-bitdepth/"],
  ["What color space does AVIF support?", "/faq/avif-colorspace/"],
  [
    "What chroma subsampling does AVIF support?",
    "/faq/avif-chromasubsampling/",
  ],
  ["Does AVIF support film grain?", "/faq/avif-filmgrain/"],
  ["Does AVIF support tiling?", "/faq/avif-tiling/"],
  ["Does AVIF support layers?", "/faq/avif-layers/"],
  ["How good is AVIF encoding speed?", "/faq/avif-encoding/"],
  ["How good is AVIF decoding speed?", "/faq/avif-decoding/"],
  [
    "Why is AVIF better than other compression codecs?",
    "/faq/avif-better-codec/",
  ],
  ["Why is AVIF worse than other codecs?", "/faq/avif-worse-codec/"],
  ["How do I convert AVIF to JPG?", "/faq/avif-to-jpg/"],
  ["How do I convert AVIF to PNG?", "/faq/avif-to-png/"],
];

const contentItem = contentTable.map((entry, i) => (
  <li
    className="py-0 list-item"
    style={{ counterIncrement: "step-counter" }}
    key={entry[0] + i}
  >
    <Link
      text={entry[0]}
      className="text-red-700 no-underline md:text-base text-tiny"
      href={`${entry[1]}`}
    />
  </li>
));

export default function BlogFaq(props: Props) {
  const { frontMatter, source } = props;
  const postMeta = { ...frontMatter };

  return (
    <>
      <Layout meta={postMeta}>
        <main>
          <div className="relative px-2 pt-8 pb-8 md:p-8 md:py-8 md:px-4 lg:pt-8 lg:pb-8 bg-gradient">
            <div className="absolute right-0 left-0 top-1 bottom-1 w-full rounded-md opacity-25 transform scale-105 md:h-full -z-1 bg-gradient blur-xl bg-200" />
            <h1 className="container mt-2 max-w-screen-md md:mt-6 md:text-4xl">
              {postMeta.title}
            </h1>
          </div>
          <article className="container p-2 mx-auto mt-8 max-w-screen-md md:p-0">
            <MDXRemote {...source} components={MDXComponents} />
            <div className="font-bold">Primary sources</div>
            <Link
              href="/blog/articles/avif-faq/"
              className="inline-block px-2 mt-2 mr-2 text-red-700 no-underline rounded-md bg-red-1000"
              text="1. AVIF - The Full Guide and FAQ"
            />
            <Link
              href="aomedia.org/"
              className="inline-block px-2 mt-2 mr-2 text-red-700 no-underline rounded-md bg-red-1000"
              text="2. AVIF AOMedia Specification"
            />
            <Link
              href="en.wikipedia.org/wiki/AVIF"
              className="inline-block px-2 mt-2 mr-2 text-red-700 no-underline rounded-md bg-red-1000"
              text="3. AVIF Wikipedia"
            />
            <Link
              href="jakearchibald.com/2020/avif-has-landed/"
              className="inline-block px-2 mt-2 mr-2 text-red-700 no-underline rounded-md bg-red-1000"
              text="4. Jake Archibald Article"
            />
            <Link
              href="netflixtechblog.com/avif-for-next-generation-image-coding-b1d75675fe4"
              className="inline-block px-2 mt-2 mr-2 text-red-700 no-underline rounded-md bg-red-1000"
              text="5. AVIF Netflix article"
            />
          </article>
          <aside>
            <Ad />
          </aside>
          <aside className="container mt-8 max-w-3xl">
            <nav
              aria-label="chapters"
              className="p-2 mt-4 rounded-lg md:p-5 md:pt-2 bg-bg-400"
            >
              <h4 className="mb-4 bold">More questions</h4>
              <ol className="list-none">{contentItem}</ol>
            </nav>
          </aside>
          <aside>
            <Ad />
          </aside>
        </main>
      </Layout>
    </>
  );
}
