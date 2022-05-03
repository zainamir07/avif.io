import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"
import readingTime from "reading-time"
import remarkSlug from "remark-slug"

import { getHeadings } from "@utils/mdx"
import { getPost } from "@utils/allPosts"

import MDXComponents from "@components/MDXComponents"
import Blog from "@components/Blog"
import ContentTable from "@components/Blog/ContentTable"

import { allReleases } from "contentlayer/generated"

export const getStaticProps: GetStaticProps = async (ctx) => {
  let contentLayersReleaseObject = allReleases.find((release) => {
    if (release.slug.split("/")[1] == ctx.params?.slug) return true
  })

  const releaseBody = contentLayersReleaseObject ? contentLayersReleaseObject.body.raw : ""

  const { data, content } = matter(releaseBody)
  const headings = await getHeadings(releaseBody)

  const selectedPosts = contentLayersReleaseObject?.relatedPosts
  const relatedPosts = selectedPosts.map((postName: string) => (getPost(postName)))

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug, require("remark-code-titles")],
    },
    scope: data,
  })

  const {body, ...metadata} = contentLayersReleaseObject? contentLayersReleaseObject : {body: ""}

  return {
    props: {
      frontMatter: {
        readingTime: readingTime(content),
        ...metadata,
      },
      source: mdxSource,
      headings,
      relatedPosts,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allReleases.map((release) => ({ params: { slug: release.slug.split("/")[1] } })),
    fallback: false,
  }
}

type PostDetailPageProps = InferGetStaticPropsType<typeof getStaticProps>;
const PostDetail: NextPage<PostDetailPageProps> = ({
  frontMatter,
  source,
  headings,
  relatedPosts,
}) => {
  return (
    <>
      <Blog meta={{ ...frontMatter }} posts={relatedPosts}>
        <ContentTable contentTable={headings} />
        <MDXRemote {...source} components={MDXComponents} />
      </Blog>
    </>
  );
};

export default PostDetail;
