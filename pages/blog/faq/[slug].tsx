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
  ["What is an AVIF file?", "/blog/faq/what-is-avif/"],
  ["What are the benefits of AVIF?", "/blog/faq/avif-benefits/"],
  ["What is the downside of AVIF?", "/blog/faq/avif-downsides/"],
  ["What is the goal of AVIF?", "/blog/faq/avif-goal/"],
  ["Why AVIF?", "/blog/faq/why-avif/"],
  ["What is AVIF used for?", "/blog/faq/avif-use/"],
  ["Who created AVIF?", "/blog/faq/avif-creator/"],
  ["How was AVIF created?", "/blog/faq/avif-creation/"],
  ["What is the technology stack behind AVIF?", "/blog/faq/avif-technologies/"],
  ["Is AVIF based on other formats?", "/blog/faq/avif-other-formats/"],
  ["Is AVIF open source?", "/blog/faq/avif-opensource/"],
  ["Does AVIF have patents?", "/blog/faq/avif-patents/"],
  ["What features does AVIF support?", "/blog/faq/avif-features/"],
  ["Is AVIF a lossless or lossy format?", "/blog/faq/avif-loss/"],
  ["Is AVIF lossless?", "/blog/faq/avif-lossless/"],
  ["Is AVIF lossy?", "/blog/faq/avif-lossy/"],
  ["Does AVIF support transparency?", "/blog/faq/avif-transparency/"],
  ["Does AVIF support animation?", "/blog/faq/avif-animation/"],
  ["Does AVIF support SDR?", "/blog/faq/avif-sdr/"],
  ["Does AVIF support HDR?", "/blog/faq/avif-hdr/"],
  [
    "What is the highest megapixel count for AVIF?",
    "/blog/faq/avif-megapixel/",
  ],
  ["Does AVIF support Wide Color Gamut?", "/blog/faq/avif-wcg/"],
  ["What color bit depth does AVIF support?", "/blog/faq/avif-bitdepth/"],
  ["What color space does AVIF support?", "/blog/faq/avif-colorspace/"],
  [
    "What chroma subsampling does AVIF support?",
    "/blog/faq/avif-chromasubsampling/",
  ],
  ["Does AVIF support film grain?", "/blog/faq/avif-filmgrain/"],
  ["Does AVIF support tiling?", "/blog/faq/avif-tiling/"],
  ["Does AVIF support layers?", "/blog/faq/avif-layers/"],
  ["How good is AVIF encoding speed?", "/blog/faq/avif-encoding/"],
  ["How good is AVIF decoding speed?", "/blog/faq/avif-decoding/"],
  [
    "Why is AVIF better than other compression codecs?",
    "/blog/faq/avif-better-codec/",
  ],
  ["Why is AVIF worse than other codecs?", "/blog/faq/avif-worse-codec/"],
  ["How do I convert AVIF to JPG?", "/blog/faq/avif-to-jpg/"],
  ["How do I convert AVIF to PNG?", "/blog/faq/avif-to-png/"],
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
              className="p-4 my-4 rounded-lg md:py-2 bg-bg-400"
            >
              <h4 className="mb-2 bold">More questions</h4>
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
