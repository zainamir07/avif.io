import React from "react";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "@components/Link";
import path from "path";
import glob from "glob";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import readingTime from "reading-time";
import remarkSlug from "remark-slug";

import { postFilePaths, BLOG_POSTS_PATH, getHeadings } from "@utils/mdx";

import MDXComponents from "@components/MDXComponents";
import Blog from "@components/Blog";
import ContentTable from "@components/Blog/ContentTable";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const filePath = path.join(
    `${BLOG_POSTS_PATH}/articles`,
    `${ctx.params?.slug}.mdx`
  );

  const source = fs.readFileSync(filePath);

  const { data, content } = matter(source);
  const headings = await getHeadings(content);

  const mdxFiles = glob.sync("data/**/*.mdx");
  const selectedPosts = data.relatedPosts.map((post: string) =>
    mdxFiles.find((file) => file.indexOf(post) >= 0)
  );

  const relatedPosts = selectedPosts.map((post: string) => {
    const file = path.join(process.cwd(), post);
    const sourceFile = fs.readFileSync(file);
    const { data } = matter(sourceFile);
    return { ...data };
  });

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug, require("remark-code-titles")],
    },
    scope: data,
  });

  return {
    props: {
      frontMatter: {
        readingTime: readingTime(content),
        ...data,
      },
      source: mdxSource,
      headings,
      relatedPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths(`${BLOG_POSTS_PATH}/articles`)
    .map((p) => p.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

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

type PostDetailPageProps = InferGetStaticPropsType<typeof getStaticProps>;
const PostDetail: NextPage<PostDetailPageProps> = ({
  frontMatter,
  source,
  headings,
  relatedPosts,
}) => {
  return (
    <>
      <Blog postMeta={{ ...frontMatter }} posts={relatedPosts}>
        <ContentTable contentTable={headings} />
        <MDXRemote {...source} components={MDXComponents} />
      </Blog>
    </>
  );
};

export default PostDetail;
