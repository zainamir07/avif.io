import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'

// POSTS_PATH is useful when you want to get the path to a specific file
export const BLOG_POSTS_PATH = path.join(process.cwd(), 'data/blog')
export const DATA_PATH = path.join(process.cwd(), 'data')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(BLOG_POSTS_PATH)
  // Only include md(x) files
  .filter((p) => /\.mdx?$/.test(p))

const fileLastUpdate = (path: string) => fs.statSync(path).mtime

export const getDataByFilename = async (filename: string) => {
  const filePath = path.join(DATA_PATH, `${filename}.mdx`)
  const source = fs.readFileSync(filePath)

  const { data, content } = matter(source)

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
    frontMatter: {
      ...data,
      updatedAt: fileLastUpdate(filePath).getTime(),
    },
    source: mdxSource,
  }
}
