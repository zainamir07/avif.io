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
import Head from "next/head";
import { jsonLdScriptProps } from "react-schemaorg";
import { FAQPage } from "schema-dts";
import { allFAQs } from "contentlayer/generated";

export const getStaticProps: GetStaticProps = async (ctx) => {
  let contentLayersFaqObject = allFAQs.find((faq) => {
    if (faq.slug.split("/")[1] == ctx.params?.slug) return true
  })

  const faqBody = contentLayersFaqObject ? contentLayersFaqObject.body.raw : ""

  const { data, content } = matter(faqBody)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug, require("remark-code-titles")],
    },
    scope: data,
  })

  const {body, ...metadata} = contentLayersFaqObject? contentLayersFaqObject : {body: ""}

  return {
    props: {
      frontMatter: {
        ...metadata,
      },
      source: mdxSource
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allFAQs.map((faq) => ({ params: { slug: faq.slug.split("/")[1] } })),
    fallback: false,
  }
}

interface Props {
  children: any;
  posts: any;
  frontMatter: any;
  source: any;
}

const contentTable = [
  ["What is an AVIF file?", "what-is-avif"],
  ["What are the benefits of AVIF?", "avif-benefits"],
  ["What is the downside of AVIF?", "avif-downsides"],
  ["What is the goal of AVIF?", "avif-goal"],
  ["Why AVIF?", "why-avif"],
  ["What is AVIF used for?", "avif-use"],
  ["Who created AVIF?", "avif-creator"],
  ["How was AVIF created?", "avif-creation"],
  ["What is the technology stack behind AVIF?", "avif-technologies"],
  ["Is AVIF based on other formats?", "avif-other-formats"],
  ["Is AVIF open source?", "avif-opensource"],
  ["Does AVIF have patents?", "avif-patents"],
  ["What features does AVIF support?", "avif-features"],
  ["Is AVIF a lossless or lossy format?", "avif-loss"],
  ["Is AVIF lossless?", "avif-lossless"],
  ["Is AVIF lossy?", "avif-lossy"],
  ["Does AVIF support transparency?", "avif-transparency"],
  ["Does AVIF support animation?", "avif-animation"],
  ["Does AVIF support SDR?", "avif-sdr"],
  ["Does AVIF support HDR?", "avif-hdr"],
  ["What is the highest megapixel count for AVIF?", "avif-megapixel"],
  ["Does AVIF support Wide Color Gamut?", "avif-wcg"],
  ["What color bit depth does AVIF support?", "avif-bitdepth"],
  ["What color space does AVIF support?", "avif-colorspace"],
  ["What chroma subsampling does AVIF support?", "avif-chromasubsampling"],
  ["Does AVIF support film grain?", "avif-filmgrain"],
  ["Does AVIF support tiling?", "avif-tiling"],
  ["Does AVIF support layers?", "avif-layers"],
  ["How good is AVIF encoding speed?", "avif-encoding"],
  ["How good is AVIF decoding speed?", "avif-decoding"],
  ["Why is AVIF better than other compression codecs?", "avif-better-codec"],
  ["Why is AVIF worse than other codecs?", "avif-worse-codec"],
  ["How do I convert AVIF to JPG?", "avif-to-jpg"],
  ["How do I convert AVIF to PNG?", "avif-to-png"],
];

const sources = [
  ["/blog/articles/avif-faq/", "1. AVIF - The Full Guide and FAQ"],
  ["aomedia.org/", "2. AVIF AOMedia Specification"],
];

export default function BlogFaq(props: Props) {
  const { frontMatter, source } = props;
  const meta = { ...frontMatter };

  return (
    <>
      <Layout meta={meta}>
        <main>
          <Head>
            <script
              {...jsonLdScriptProps<FAQPage>({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: {
                  "@type": "Question",
                  name: meta.title,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: meta.answer,
                    url: process.env.NEXT_PUBLIC_SITE_URL + meta.url,
                  },
                },
              })}
            />
          </Head>
          <div className="relative px-2 pt-8 pb-8 md:p-8 md:py-8 md:px-4 lg:pt-8 lg:pb-8 bg-gradient">
            <h1 className="container mt-2 max-w-screen-md md:mt-6 md:text-4xl">
              {meta.title}
            </h1>
          </div>
          <article className="container p-2 mx-auto mt-8 max-w-screen-md md:p-0">
            <MDXRemote {...source} components={MDXComponents} />
            <div className="font-bold">Primary sources</div>
            {sources.map((source, i) => (
              <Link
                key={i}
                href={source[0]}
                className="inline-block px-2 mt-2 mr-2 text-red-700 no-underline rounded-md bg-red-1000"
                text={source[1]}
              />
            ))}
          </article>
          <aside>
            <Ad />
          </aside>
          <aside className="container mt-8 max-w-3xl">
            <nav
              aria-label="chapters"
              className="p-4 my-4 rounded-lg md:py-2 bg-bg-400"
            >
              <h4 className="mb-2 bold">More questions about AVIF</h4>
              <ol className="list-none">
                {contentTable.map((entry, i) => (
                  <li
                    className="py-0 list-item"
                    style={{ counterIncrement: "step-counter" }}
                    key={entry[0] + i}
                  >
                    <Link
                      text={entry[0]}
                      className="text-red-700 no-underline md:text-base text-tiny"
                      href={`/blog/faq/${entry[1]}/`}
                    />
                  </li>
                ))}
              </ol>
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
