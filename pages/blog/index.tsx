import fs from "fs";
import path from "path";
import { useState } from "react";
import { InferGetStaticPropsType, NextPage } from "next";
import matter from "gray-matter";
import { postFilePaths, BLOG_POSTS_PATH } from "@utils/mdx";
import Post from "@components/Blog/Post";
import Layout from "@components/Layout";
import Ad from "@components/Blog/Ad";

const meta = {
  blog: {
    title: "AVIF Blog",
    description: "Get a support overview, find tutorials or ask a question",
    url: "blog/",
    datePublished: "2020-09-01",
  },
};

const generatePosts = (folderPath: string) =>
  postFilePaths(folderPath).map((filePath: string) => {
    const source = fs.readFileSync(path.join(folderPath, filePath));
    const { data } = matter(source);

    return {
      description: data.description,
      title: data.title,
      support: data.support ? data.support : "",
      category: data.category,
      subcategory: data.subcategory ? data.subcategory : "",
      keyword: data.keyword ? data.keyword : data.title,
      slug: filePath.replace(".mdx", ""),
    };
  });

export const getStaticProps = async () => {
  const articles = generatePosts(`${BLOG_POSTS_PATH}/articles`);
  const comparisons = generatePosts(`${BLOG_POSTS_PATH}/comparisons`);
  const releases = generatePosts(`${BLOG_POSTS_PATH}/releases`);
  const tutorials = generatePosts(`${BLOG_POSTS_PATH}/tutorials`);
  const faq = generatePosts(`${BLOG_POSTS_PATH}/faq`);
  const news = generatePosts(`${BLOG_POSTS_PATH}/news`);

  const listPostsByFolder = {
    articles,
    comparisons,
    releases,
    tutorials,
    faq,
    news,
  };

  const defaultFilteredPost = [
    ...articles,
    ...comparisons,
    ...releases,
    ...tutorials,
    ...faq,
    ...news,
  ];

  const listSubCategories = [
    ...new Set(defaultFilteredPost.map((post) => post.subcategory)),
  ].filter(Boolean);
  const listCategories = [
    ...new Set(defaultFilteredPost.map((post) => post.category)),
  ].filter(Boolean);
  const listSupport = [
    ...new Set(defaultFilteredPost.map((post) => post.support)),
  ].filter(Boolean);

  return {
    props: {
      articles,
      comparisons,
      releases,
      tutorials,
      news,
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
  articles,
  comparisons,
  releases,
  tutorials,
  news,
  /*listAllCategories,*/
  listSupport,
  listSubCategories,
  listCategories,
}) => {
  const [filteredPost, setFilteredPost] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [selectedCategoryPill, setSelectedCategoryPill] = useState("");

  const handleSelectedPill = (category: string) => {
    if (category === selectedCategoryPill) {
      setSelectedCategoryPill("");
      setFilteredPost([]);
      return;
    }

    setSelectedCategoryPill(category);
    const filteredPosts = defaultFilteredPost.filter((post) => {
      return (
        post.category === category ||
        post.subcategory === category ||
        post.support === category
      );
    });

    setFilteredPost(filteredPosts as any);
  };

  const handleFilterByKeyword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const keyword = event.target.value;
    const filtered = defaultFilteredPost.filter((post) =>
      post.title.toLowerCase().includes(keyword.toLowerCase())
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
        <div className="container px-2">
          <div className="relative mt-1 mb-3 rounded-md">
            <input
              type="text"
              placeholder="Search all posts"
              className="block py-3 px-3 pr-10 w-full text-white rounded-md border-2 outline-none focus:border-pink-700 bg-bg-400 border-bg-500"
              onChange={handleFilterByKeyword}
            />
            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none group">
              🔎︎
            </div>
          </div>
          <div className="mb-2">
            {listCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectedPill(category)}
                className={`inline-flex items-center px-2 py-0 mt-2 mr-2 py-0.5 rounded-sm font-normal cursor-pointer ${
                  selectedCategoryPill === category
                    ? "bg-red-1000 border-transparent text-pink-700 hover:bg-indigo-700"
                    : "bg-bg-500 text-gray-300"
                }`}
              >
                {selectedCategoryPill === category && (
                  <span className="mr-1">✓</span>
                )}
                {category}
              </button>
            ))}
          </div>
          <div className="mb-2">
            {listSubCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectedPill(category)}
                className={`inline-flex items-center px-2 py-0 mt-2 mr-2 py-0.5 rounded-sm font-normal cursor-pointer ${
                  selectedCategoryPill === category
                    ? "bg-red-1000 border-transparent text-pink-700 hover:bg-indigo-700"
                    : "bg-bg-500 text-gray-300"
                }`}
              >
                {selectedCategoryPill === category && (
                  <span className="mr-1">✓</span>
                )}
                {category}
              </button>
            ))}
          </div>
          <div className="mb-2">
            {listSupport.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectedPill(category)}
                className={`inline-flex items-center px-2 py-0 mt-2 mr-2 py-0.5 rounded-sm font-normal cursor-pointer ${
                  selectedCategoryPill === category
                    ? "bg-red-1000 border-transparent text-pink-700 hover:bg-indigo-700"
                    : "bg-bg-500 text-gray-300"
                }`}
              >
                {selectedCategoryPill === category && (
                  <span className="mr-1">✓</span>
                )}
                {category}
              </button>
            ))}
          </div>
          {filterKeyword.length > 0 || filteredPost.length ? (
            <div className="grid grid-cols-1 gap-2 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {filteredPost.map((post: any) => (
                <Post
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  support={post.support}
                  category={post.category}
                  subcategory={post.subcategory}
                  keyword={post.keyword}
                  slug={post.slug}
                />
              ))}
            </div>
          ) : (
            <>
              <h3
                className="mt-8 mb-3 text-xl font-bold capitalize"
                id={"articles"}
              >
                Articles
              </h3>
              <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {articles.map((post: any) => (
                  <Post
                    key={post.slug}
                    title={post.title}
                    description={post.description}
                    support={post.support}
                    category={post.category}
                    subcategory={post.subcategory}
                    keyword={post.keyword}
                    slug={post.slug}
                  />
                ))}
              </div>
              <aside className="px-2 mx-auto max-w-screen-md">
                <Ad />
              </aside>
              <h3
                className="mt-8 mb-3 text-xl font-bold capitalize"
                id={"tutorials"}
              >
                Tutorials
              </h3>
              <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {tutorials.map((post: any) => (
                  <Post
                    key={post.slug}
                    title={post.title}
                    description={post.description}
                    support={post.support}
                    category={post.category}
                    subcategory={post.subcategory}
                    keyword={post.keyword}
                    slug={post.slug}
                  />
                ))}
              </div>
              <aside className="px-2 mx-auto max-w-screen-md">
                <Ad />
              </aside>
              <h3
                className="mt-8 mb-3 text-xl font-bold capitalize"
                id={"news"}
              >
                News
              </h3>
              <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {news.map((post: any) => (
                  <Post
                    key={post.slug}
                    title={post.title}
                    description={post.description}
                    support={post.support}
                    category={post.category}
                    subcategory={post.subcategory}
                    keyword={post.keyword}
                    slug={post.slug}
                  />
                ))}
              </div>
              <aside className="px-2 mx-auto max-w-screen-md">
                <Ad />
              </aside>
              <h3
                className="mt-8 mb-3 text-xl font-bold capitalize"
                id={"comparisons"}
              >
                Comparisons
              </h3>
              <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {comparisons.map((post: any) => (
                  <Post
                    key={post.slug}
                    title={post.title}
                    description={post.description}
                    support={post.support}
                    category={post.category}
                    subcategory={post.subcategory}
                    keyword={post.keyword}
                    slug={post.slug}
                  />
                ))}
              </div>
              <aside className="px-2 mx-auto max-w-screen-md">
                <Ad />
              </aside>
              <h3
                className="mt-8 mb-3 text-xl font-bold capitalize"
                id={"releasenotes"}
              >
                Changelog
              </h3>
              <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {releases.map((post: any) => (
                  <Post
                    key={post.slug}
                    title={post.title}
                    description={post.description}
                    support={post.support}
                    category={post.category}
                    subcategory={post.subcategory}
                    keyword={post.keyword}
                    slug={post.slug}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default BlogAvif;
