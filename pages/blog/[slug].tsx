import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import readingTime from 'reading-time'

import { postFilePaths, POSTS_PATH } from 'utils/mdx'

import MDXComponents from '@components/MDXComponents'
import Blog from "@components/Blog";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const filePath = path.join(POSTS_PATH, `${ctx.params?.slug}.mdx`)
  const source = fs.readFileSync(filePath)

  const { data, content } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
      ],
      // rehypePlugins: [mdxPrism],
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
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    .map((p) => p.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

type PostDetailPageProps = InferGetStaticPropsType<typeof getStaticProps>
const PostDetail: NextPage<PostDetailPageProps> = ({ frontMatter, source }) => {

  return (
    <>
      <Blog
        postMeta={{...frontMatter}}
        posts={[frontMatter.tutCss, frontMatter.tutHtml, frontMatter.tutWordpress]}
      >
        <MDXRemote {...source} components={MDXComponents} />
      </Blog>
    </>
  )
}

export default PostDetail
