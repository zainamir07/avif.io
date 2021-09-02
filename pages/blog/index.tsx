import fs from "fs";
import path from "path";
import * as React from "react";
import { InferGetStaticPropsType, NextPage } from "next";
import matter from "gray-matter";
import clsx from "clsx";

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

  return {
    props: {
      defaultFilteredPost,
      listSubCategories,
      listCategories,
      listAllCategories: [...listCategories, ...listSubCategories],
      posts: listPostsByFolder as any,
    },
  };
};

type PostsPageProps = InferGetStaticPropsType<typeof getStaticProps>;
const BlogAvif: NextPage<PostsPageProps> = ({
  defaultFilteredPost,
  posts,
  listAllCategories,
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
        post.data.category === category || post.data.subcategory === category
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
          <h2 className="text-base">{meta.blog.description}</h2>
        </div>
        <div className="container max-w-screen-lg">
          <div className="relative mt-1 mb-2 rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Search Articles"
              className="block py-1 px-3 pr-10 w-full text-gray-800 rounded-md outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-4 focus:ring-offset-bg-700"
              onChange={handleFilterByKeyword}
            />
            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-800"
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
          <div>
            {listAllCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectedPill(category)}
                className={clsx(
                  "inline-flex items-center px-3 py-0 mt-2 mr-2 py-0.5 rounded-full text-sm font-medium cursor-pointer bg-red-100 text-red-800",
                  selectedCategoryPill === category &&
                    "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                )}
              >
                {selectedCategoryPill === category && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 -ml-1 w-3 h-3"
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
            <div className="grid grid-cols-1 gap-4 m-2 md:grid-cols-2 md:m-3 lg:grid-cols-3">
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
