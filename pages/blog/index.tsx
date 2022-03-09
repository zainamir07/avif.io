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

  const articleTypes = [
    ["Articles", articles],
    ["News", news],
    ["Comparisons", comparisons],
    ["Tutorials", tutorials],
    ["Changelog", releases],
  ];

  const filterTypes = [listCategories, listSubCategories, listSupport];

  return (
    <Layout meta={meta.blog}>
      <main className="p-2 md:p-4 archive blog">
        <div className="mt-12 text-center">
          <h1>{meta.blog.title}</h1>
          <h2 className="mb-8 text-base">{meta.blog.description}</h2>
        </div>
        <div className="container px-2">
          <input
            type="text"
            placeholder="🔎︎ Search all posts"
            className="relative mt-1 mb-3 rounded-md block py-3 px-3 pr-10 w-full text-white border-2 outline-none focus:border-pink-700 bg-bg-400 border-bg-500"
            onChange={handleFilterByKeyword}
          />
          {filterTypes.map((type: any, key: any) => (
            <div className="mb-2" key={key}>
              {type.map((category: any) => (
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
          ))}
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
              {articleTypes.map((article: any, key: any) => (
                <section key={key}>
                  <h3
                    className="mt-8 mb-3 text-xl font-bold capitalize"
                    id={`${article[0].toLowerCase}`}
                  >
                    {article[0]}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {article[1].map((post: any) => (
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
                </section>
              ))}
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default BlogAvif;
