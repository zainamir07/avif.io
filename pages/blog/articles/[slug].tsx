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
