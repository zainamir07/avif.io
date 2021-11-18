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
import Script from "next/script";

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
  ["What is an AVIF file?", "https://avif.io/faq/"],
  ["What are the benefits of AVIF?", "https://avif.io/faq/"],
  ["What is the downside of AVIF?", "https://avif.io/faq/"],
  ["What is the goal of AVIF?", "https://avif.io/faq/"],
  ["Why AVIF?", "https://avif.io/faq/"],
  ["What is AVIF used for?", "https://avif.io/faq/"],
  ["Who created AVIF?", "https://avif.io/faq/"],
  ["How was AVIF created?", "https://avif.io/faq/"],
  ["What is the technology stack behind AVIF?", "https://avif.io/faq/"],
  ["Is AVIF based on other formats?", "https://avif.io/faq/"],
  ["Is AVIF open source?", "https://avif.io/faq/"],
  ["Does AVIF have patents?", "https://avif.io/faq/"],
  ["What features does AVIF support?", "https://avif.io/faq/"],
  ["Is AVIF a lossless or lossy format?", "https://avif.io/faq/"],
  ["Is AVIF lossless?", "https://avif.io/faq/"],
  ["Is AVIF lossy?", "https://avif.io/faq/"],
  ["Does AVIF support transparency?", "https://avif.io/faq/"],
  ["Does AVIF support animation?", "https://avif.io/faq/"],
  ["Does AVIF support SDR?", "https://avif.io/faq/"],
  ["Does AVIF support HDR?", "https://avif.io/faq/"],
  ["What is the highest megapixel count for AVIF?", "https://avif.io/faq/"],
  ["Does AVIF support Wide Color Gamut?", "https://avif.io/faq/"],
  ["What color bit depth does AVIF support?", "https://avif.io/faq/"],
  ["What color space does AVIF support?", "https://avif.io/faq/"],
  ["What chroma subsampling does AVIF support?", "https://avif.io/faq/"],
  ["Does AVIF support film grain?", "https://avif.io/faq/"],
  ["Does AVIF support tiling?", "https://avif.io/faq/"],
  ["Does AVIF support layers?", "https://avif.io/faq/"],
  ["How good is AVIF encoding speed?", "https://avif.io/faq/"],
  ["How good is AVIF decoding speed?", "https://avif.io/faq/"],
  ["Why is AVIF better than other compression codecs?", "https://avif.io/faq/"],
  ["Why is AVIF worse than other codecs?", "https://avif.io/faq/"],
  ["What is the best file format for a web graphic?", "https://avif.io/faq/"],
  ["Is AVIF better than JPG?", "https://avif.io/faq/"],
  ["What does AVIF offer over JPEG 2000?", "https://avif.io/faq/"],
  ["Is AVIF better than PNG?", "https://avif.io/faq/"],
  ["What is the difference between AVIF and HEIF?", "https://avif.io/faq/"],
  ["Is AVIF better than WebP?", "https://avif.io/faq/"],
  ["Is AVIF better than JPEG XL?", "https://avif.io/faq/"],
  ["Should I use AVIF or JXL?", "https://avif.io/faq/"],
  ["How do I convert to AVIF?", "https://avif.io/faq/"],
  ["How do I convert AVIF to JPG?", "https://avif.io/faq/"],
  ["How do I convert AVIF to PNG?", "https://avif.io/faq/"],
  ["How do I make an AVIF file?", "https://avif.io/faq/"],
  ["Should I use AVIF?", "https://avif.io/faq/"],
  ["How can I use AVIF in a web environment?", "https://avif.io/faq/"],
  ["How do I view an AVIF file?", "https://avif.io/faq/"],
  ["Is AVIF supported?", "https://avif.io/faq/"],
  ["What type of software and services support AVIF?", "https://avif.io/faq/"],
  ["What browsers support AVIF?", "https://avif.io/faq/"],
  ["Do smartphone browsers support AVIF?", "https://avif.io/faq/"],
  ["Which OS supports AVIF?", "https://avif.io/faq/"],
  ["What software supports AVIF?", "https://avif.io/faq/"],
  ["What mail clients support AVIF?", "https://avif.io/faq/"],
  ["What online services support AVIF?", "https://avif.io/faq/"],
  ["What CDNs support AVIF?", "https://avif.io/faq/"],
  ["How do I open an AVIF file on mac?", "https://avif.io/faq/"],
  ["Does Android support AVIF?", "https://avif.io/faq/"],
  ["Does WordPress support AVIF?", "https://avif.io/faq/"],
];

const contentItem = contentTable.map((entry, i) => (
  <li
    className="py-0 md:py-1 list-item"
    style={{ counterIncrement: "step-counter" }}
    key={entry[0] + i}
  >
    <a
      className="text-red-700 no-underline md:text-base text-tiny"
      href={`${entry[1]}`}
    >
      {entry[0]}
    </a>
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
            <h1 className="container max-w-screen-md mt-2 md:mt-6 md:text-4xl">
              {postMeta.title}
            </h1>
          </div>
          <article className="container mt-8 p-2 mx-auto max-w-screen-md md:p-0">
            <MDXRemote {...source} components={MDXComponents} />
            <div className=" p-2 mt-2 text-red-700 rounded-md bg-red-1000">
              Source:{" "}
              <Link
                href="/blog/articles/avif-faq/"
                className="no-underline"
                text="AVIF FAQ"
              />
            </div>
          </article>
          <aside>
            <Script
              strategy="lazyOnload"
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            />
          </aside>
          <aside className="container max-w-3xl mt-8">
            <nav
              aria-label="chapters"
              className="p-2 mt-4 rounded-lg md:p-5 md:pt-2 bg-bg-400"
            >
              <h4 className="mb-4 bold">More questions</h4>
              <ol className="list-none">{contentItem}</ol>
            </nav>
          </aside>
        </main>
      </Layout>
    </>
  );
}
