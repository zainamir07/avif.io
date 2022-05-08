import { defineDocumentType } from "contentlayer/source-files";

export const FAQs = defineDocumentType(() => ({
  name: "FAQs",
  filePathPattern: `faq/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    answer: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    datePublished: {
      type: "date",
    },
    dateModified: {
      type: "date",
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    category: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").shift(),
    },
  },
}));
