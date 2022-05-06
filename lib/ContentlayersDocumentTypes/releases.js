import { defineDocumentType } from "contentlayer/source-files";
import { abstractDocumentFrontMatter } from "./AbstractFrontMatter";

export const Releases = defineDocumentType(() => ({
  name: "Releases",
  filePathPattern: `releases/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    keyword: {
      type: "string",
    },
    datePublished: {
      type: "string",
    },
    dateModified: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
    wordCount: {
      type: "number",
      resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
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
