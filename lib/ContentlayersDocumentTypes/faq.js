import { defineDocumentType } from 'contentlayer/source-files'
import { abstractDocumentFrontMatter } from "./AbstractFrontMatter"

export const FAQ = defineDocumentType(() => ({
    name: 'FAQ',
    filePathPattern: `faq/*.mdx`,
    contentType: 'mdx',
    fields: {
      ...abstractDocumentFrontMatter, 
      answer: {
        type: 'string',
        description: '',
        required: true
      }
    },
    computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
  },
}))