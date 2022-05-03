import { makeSource } from 'contentlayer/source-files'
import {Article, Comparisons, FAQ, News, Releases, Tutorials} from './lib/ContentlayersDocumentTypes'

export default makeSource({
    contentDirPath: 'data/blog',
    documentTypes: [Article, Comparisons, FAQ, News, Releases, Tutorials],
})
