import fs from 'fs'
import path from 'path'
import { InferGetStaticPropsType, NextPage } from 'next'
import matter from 'gray-matter'

import { postFilePaths, BLOG_POSTS_PATH } from '@utils/mdx'
import Posts from "@components/Blog/Posts";
import Layout from "@components/Layout";
import meta from "@lib/meta.json";

const generatePosts = (folderPath: string) => postFilePaths(folderPath).map((filePath: string) => {
  const source = fs.readFileSync(path.join(folderPath, filePath))
  const { data } = matter(source)

  return {
    data,
    slug: filePath.replace('.mdx', ''),
  }
})

export const getStaticProps = async () => {
  const articles = generatePosts(`${BLOG_POSTS_PATH}/articles`)
  const comparisons = generatePosts(`${BLOG_POSTS_PATH}/comparisons`)
  const releases = generatePosts(`${BLOG_POSTS_PATH}/releases`)
  const tutorials = generatePosts(`${BLOG_POSTS_PATH}/tutorials`)

  return {
    props: {
      articles,
      releases,
      tutorials,
      comparisons,
    },
  }
}

type PostsPageProps = InferGetStaticPropsType<typeof getStaticProps>
const BlogAvif: NextPage<PostsPageProps> = ({ articles, comparisons, releases, tutorials }) => {
  return (
    <Layout meta={meta.blog}>
      <main className="p-2 md:p-4 archive blog">
        <div className="mt-12 text-center">
          <h1>{meta.blog.title}</h1>
          <h2 className="text-base">{meta.blog.description}</h2>
        </div>
        <div className="container max-w-screen-lg">
          <Posts posts={articles} title="articles" />
          <Posts posts={tutorials} title="tutorials" />
          <Posts posts={comparisons} title="comparisons" />
          <Posts posts={releases} title="releases" />
        </div>
      </main>
    </Layout>
)}

export default BlogAvif
