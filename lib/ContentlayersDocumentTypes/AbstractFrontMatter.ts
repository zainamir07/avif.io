import { FieldDefs } from 'contentlayer/source-files'

export const abstractDocumentFrontMatter: FieldDefs = {
    title: {
        type: 'string',
        description: 'The title of the post',
        required: true
    },
    description: {
        type: 'string',
        description: 'Description of the post',
        required: true
    },
    keyword: {
        type: 'string',
        description: 'The document keyword',
    },
    category: {
        type: 'string',
        description: 'The blog category of the document',
    },
    url: {
        type: 'string',
        description: 'URL to the post',
    },
    datePublished: {
        type: 'string',
        description: 'The date the document was published',
    },
    dateModified: {
        type: 'string',
        description: 'The date the document was modified',
        required: true
    },
    sources: {
        type: 'json',
        description: 'URL to the post',
    },
    tags: {
        type: 'json',
        description: 'Word(s) or phrase(s) that describe post',
    },
    questions: {
        type: 'json',
        description: 'Common question(s) that could be asked',
    },
    relatedPosts: {
        type: 'json',
        description: 'Other blog posts that are similar this the post',

    }
}