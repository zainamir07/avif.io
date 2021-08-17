import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import readingTime from 'reading-time'

import { postFilePaths, BLOG_POSTS_PATH, getHeadings } from '@utils/mdx'

import MDXComponents from '@components/MDXComponents'
import Blog from '@components/Blog';
import ContentTable from '@components/Blog/ContentTable'

import meta from '@lib/meta.json';



export const getStaticProps: GetStaticProps = async (ctx) => {
  const filePath = path.join(`${BLOG_POSTS_PATH}/comparisons`, `${ctx.params?.slug}.mdx`)
  const source = fs.readFileSync(filePath)

  const { data, content } = matter(source)
  const headings = await getHeadings(content)


  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
      ],
    },
    scope: data,
  })

  return {
    props: {
      frontMatter: {
        readingTime: readingTime(content),
        ...data,
      },
      source: mdxSource,
      headings,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths(`${BLOG_POSTS_PATH}/comparisons`)
    .map((p) => p.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

type PostDetailPageProps = InferGetStaticPropsType<typeof getStaticProps>
const PostDetail: NextPage<PostDetailPageProps> = ({ frontMatter, source, headings }) => {
  return (
    <>
      <Blog
        postMeta={{ ...frontMatter }}
        posts={frontMatter.relatedPosts.map((post: string) => (meta as any)[post]) || []}
      >
        <ContentTable contentTable={headings} />
        <MDXRemote {...source} components={MDXComponents} />
      </Blog>
    </>
  )
}

export default PostDetail
