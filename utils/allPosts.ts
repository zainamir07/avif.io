import {
  allArticles,
  allComparisons,
  allFAQs,
  allTutorials,
} from "contentlayer/generated";

type Raw = {
  sourceFilePath: string;
  sourceFileName: string;
  sourceFileDir: string;
  contentType: string;
  flattenedPath: string;
};

const getPostByArray = (
  arr: any[],
  postName: string,
  slug?: string,
  id?: string,
  raw?: Raw
) => {
  return arr.find((post) => {
    if (
      post._raw.sourceFileName.split(".")[0] == postName ||
      post.slug == slug ||
      post._id == id ||
      post._raw == raw
    )
      return true;
  });
};

export function getPost(
  postName: string,
  slug?: string,
  id?: string,
  raw?: Raw
): any | undefined {
  let result;
  result = getPostByArray(allArticles, postName, slug, id, raw);
  if (!result) result = getPostByArray(allComparisons, postName, slug, id, raw);
  if (!result) result = getPostByArray(allFAQs, postName, slug, id, raw);
  if (!result) result = getPostByArray(allTutorials, postName, slug, id, raw);

  let post;
  if (result) {
    const { body, ...data } = result;
    post = data;
    return post;
  }

  return post;
}
