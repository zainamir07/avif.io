import { defineDocumentType } from "contentlayer/source-files";
import { abstractDocumentFrontMatter } from "./AbstractFrontMatter";

export const FAQs = defineDocumentType(() => ({
  name: "FAQs",
  filePathPattern: `faq/*.mdx`,
  contentType: "mdx",
  fields: {
    ...abstractDocumentFrontMatter,
    answer: {
      type: "string",
      description: "",
      required: true,
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
