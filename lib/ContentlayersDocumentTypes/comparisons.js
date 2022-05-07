import { defineDocumentType } from "contentlayer/source-files";
import { abstractDocumentFrontMatter } from "./AbstractFrontMatter";

export const Comparisons = defineDocumentType(() => ({
  name: "Comparisons",
  filePathPattern: `comparisons/*.mdx`,
  contentType: "mdx",
  fields: { ...abstractDocumentFrontMatter },
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
