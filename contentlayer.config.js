import { makeSource } from "contentlayer/source-files";
import {
  Articles,
  Comparisons,
  FAQs,
  News,
  Releases,
  Tutorials,
} from "./lib/ContentlayersDocumentTypes";

export default makeSource({
  contentDirPath: "blog",
  documentTypes: [Articles, Comparisons, FAQs, News, Releases, Tutorials],
});
