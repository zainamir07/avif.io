import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
// import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'

// import { fullDate } from 'utils/date'
import { postFilePaths, POSTS_PATH } from 'utils/mdx'

// import BlogSeo from 'components/BlogSeo'
import MDXComponents from '@components/MDXComponents'
// import Container from 'components/Container'
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
      slug: ctx.params?.slug,
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
const PostDetail: NextPage<PostDetailPageProps> = ({ frontMatter, source, slug }) => {

  console.log(frontMatter)

  return (
    <>
      <div
        // postMeta={meta.imageOptimizationIn2021}
        // posts={[meta.tutCss, meta.tutHtml, meta.tutWordpress]}
      >
        <article className="blog m-auto prose dark:prose-dark">
          <header className="max-auto text-left mb-8">
            <h1 className="text-3xl md:text-4xl leading-tight mb-3 pt-6 title dark:text-white">
              {frontMatter.title}
            </h1>
            {/* <div className="-mt-6 text-gray-400 text-sm">
              <time dateTime={frontMatter.publishedAt}>{fullDate(frontMatter.publishedAt)}</time> on{' '}
              {frontMatter.tags.join(', ')} • {frontMatter.readingTime.text}
            </div> */}
          </header>
          <main>
            <MDXRemote {...source} components={MDXComponents} />
          </main>
        </article>
      </div>
      {/* <BlogSeo url={`https://rivki.dev/blog/${slug}`} {...frontMatter} /> */}
      
    </>
  )
}

export default PostDetail
