// @ts-nocheck

import { getHeadings } from "@utils/mdx";
import Blog from "@components/Blog";
import ContentTable from "@components/Blog/ContentTable";
import { allArticles, Articles } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "@components/MDXComponents";

type Props = {
  post: Articles;
  headings: any;
  relatedPosts: any;
};

const PostLayout = ({ post, headings, relatedPosts }: Props) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <>
      <Blog meta={post} posts={relatedPosts}>
        <ContentTable contentTable={headings} />
        <MDXContent components={MDXComponents} />
      </Blog>
    </>
  );
};

export const getStaticPaths = () => {
  return {
    paths: allArticles.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const relatedPosts = allArticles.map((item: any) => ({
    url: item.url,
    keyword: item.keyword,
    description: item.description,
    support: item.support ? item.support : "",
  }));
  const post = allArticles.find((post) => post.slug === params.slug);
  const headings = await getHeadings(post!.body.raw);
  return { props: { post, headings, relatedPosts } };
};

export default PostLayout;
