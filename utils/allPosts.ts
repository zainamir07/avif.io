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

const searchPostArray = (
  arr: any[],
  postName: string,
  slug?: string,
  id?: string,
  raw?: Raw
) => {
  return arr.find((post) => {
    if (
      post._raw.sourceFileName.split(".")[0] === postName ||
      post.slug === slug ||
      post._id === id ||
      post._raw === raw
    ) {
      return true;
    }
    return false;
  });
};

export function getPost(
  postName: string,
  slug?: string,
  id?: string,
  raw?: Raw
): any | undefined {
  let result = searchPostArray(allArticles, postName, slug, id, raw);
  if (!result) {
    result = searchPostArray(allComparisons, postName, slug, id, raw);
  }
  if (!result) {
    result = searchPostArray(allFAQs, postName, slug, id, raw);
  }
  if (!result) {
    result = searchPostArray(allTutorials, postName, slug, id, raw);
  }

  if (result) {
    const { body, ...data } = result;
    return data;
  }

  return undefined;
}
