import fs from "fs";
import path from "path";
import * as React from "react";
import { InferGetStaticPropsType, NextPage } from "next";
import matter from "gray-matter";

import { postFilePaths, BLOG_POSTS_PATH } from "@utils/mdx";
import Posts from "@components/Blog/Posts";
import Post from "@components/Blog/Post";
import Layout from "@components/Layout";

const meta = {
  blog: {
    title: "Articles about AVIF",
    description:
      "Read a lot of articles related to AVIF and images on the web.",
    url: "blog/",
    image: "/logo_draft.png",
    datePublished: "01.09.20",
    dateModified: "10.01.21",
  },
};

const generatePosts = (folderPath: string) =>
  postFilePaths(folderPath).map((filePath: string) => {
    const source = fs.readFileSync(path.join(folderPath, filePath));
    const { data } = matter(source);

    return {
      data,
      slug: filePath.replace(".mdx", ""),
    };
  });

export const getStaticProps = async () => {
  const articles = generatePosts(`${BLOG_POSTS_PATH}/articles`);
  const comparisons = generatePosts(`${BLOG_POSTS_PATH}/comparisons`);
  const releases = generatePosts(`${BLOG_POSTS_PATH}/releases`);
  const tutorials = generatePosts(`${BLOG_POSTS_PATH}/tutorials`);

  const listPostsByFolder = {
    articles,
    comparisons,
    releases,
    tutorials,
  };

  const defaultFilteredPost = [
    ...articles,
    ...comparisons,
    ...releases,
    ...tutorials,
  ];

  const listSubCategories = [
    ...new Set(defaultFilteredPost.map((post) => post.data.subcategory)),
  ].filter(Boolean);
  const listCategories = [
    ...new Set(defaultFilteredPost.map((post) => post.data.category)),
  ].filter(Boolean);
  const listSupport = [
    ...new Set(defaultFilteredPost.map((post) => post.data.support)),
  ].filter(Boolean);

  return {
    props: {
      defaultFilteredPost,
      listSubCategories,
      listCategories,
      listSupport,
      listAllCategories: [
        ...listCategories,
        ...listSubCategories,
        ...listSupport,
      ],

      posts: listPostsByFolder as any,
    },
  };
};

type PostsPageProps = InferGetStaticPropsType<typeof getStaticProps>;
const BlogAvif: NextPage<PostsPageProps> = ({
  defaultFilteredPost,
  posts,
  /*listAllCategories,*/
  listSupport,
  listSubCategories,
  listCategories,
}) => {
  const [filteredPost, setFilteredPost] = React.useState([]);
  const [filterKeyword, setFilterKeyword] = React.useState("");
  const [selectedCategoryPill, setSelectedCategoryPill] = React.useState("");

  const handleSelectedPill = (category: string) => {
    if (category === selectedCategoryPill) {
      setSelectedCategoryPill("");
      setFilteredPost([]);
      return;
    }

    setSelectedCategoryPill(category);
    const filteredPosts = defaultFilteredPost.filter((post) => {
      return (
        post.data.category === category ||
        post.data.subcategory === category ||
        post.data.support === category
      );
    });

    setFilteredPost(filteredPosts as any);
  };

  const handleFilterByKeyword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const keyword = event.target.value;
    const filtered = defaultFilteredPost.filter((post) =>
      post.data.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilterKeyword(keyword);
    setFilteredPost(filtered as any);
  };

  return (
    <Layout meta={meta.blog}>
      <main className="p-2 md:p-4 archive blog">
        <div className="mt-12 text-center">
          <h1>{meta.blog.title}</h1>
          <h2 className="mb-8 text-base">{meta.blog.description}</h2>
        </div>
        <div className="container max-w-screen-lg">
          <div className="relative mt-1 mb-3 rounded-md">
            <input
              type="text"
              placeholder="Search articles"
              className="block py-3 px-3 pr-10 w-full text-white rounded-md border-2 outline-none focus:border-pink-700 bg-bg-400 border-bg-500"
              onChange={handleFilterByKeyword}
            />
            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-600"
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="mb-2">
            {listCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectedPill(category)}
                className={`inline-flex items-center px-3 py-0 mt-2 mr-2 py-0.5 rounded-md text-sm cursor-pointer ${
                  selectedCategoryPill === category
                    ? "bg-red-1000 border-transparent text-pink-700 hover:bg-indigo-700"
                    : "bg-bg-500 text-gray-300"
                }`}
              >
                {selectedCategoryPill === category && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 -ml-1 w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <p>{category}</p>
              </button>
            ))}
          </div>
          <div className="mb-2">
            {listSubCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectedPill(category)}
                className={`inline-flex items-center px-3 py-0 mt-2 mr-2 py-0.5 rounded-md text-sm cursor-pointer ${
                  selectedCategoryPill === category
                    ? "bg-red-1000 border-transparent text-pink-700 hover:bg-indigo-700"
                    : "bg-bg-500 text-gray-300"
                }`}
              >
                {selectedCategoryPill === category && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 -ml-1 w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <p>{category}</p>
              </button>
            ))}
          </div>
          <div className="mb-2">
            {listSupport.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectedPill(category)}
                className={`inline-flex items-center px-3 py-0 mt-2 mr-2 py-0.5 rounded-md text-sm cursor-pointer ${
                  selectedCategoryPill === category
                    ? "bg-red-1000 border-transparent text-pink-700 hover:bg-indigo-700"
                    : "bg-bg-500 text-gray-300"
                }`}
              >
                {selectedCategoryPill === category && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 -ml-1 w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <p>{category}</p>
              </button>
            ))}
          </div>

          {filterKeyword.length > 0 || filteredPost.length ? (
            <div className="grid grid-cols-1 gap-2 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPost.map((post: any) => (
                <Post key={post.slug} {...post.data} slug={post.slug} />
              ))}
            </div>
          ) : (
            Object.keys(posts).map((key) => (
              <Posts key={key} title={key} posts={posts[key]} />
            ))
          )}
        </div>
      </main>
    </Layout>
  );
};

export default BlogAvif;
