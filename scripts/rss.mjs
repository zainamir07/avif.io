import { writeFileSync } from "fs";
import RSS from "rss";
import { allDocuments } from "../.contentlayer/generated/index.mjs";

const generate = async () => {
  const feed = new RSS({
    title: "avif.io RSS Feed",
    feed_url: "https://avif.io/rss.xml",
    site_url: "https://avif.io",
    language: "en",
  });

  allDocuments.forEach((post) => {
    feed.item({
      title: post.title,
      url: `https://avif.io/${post.url}/`,
      date: post.datePublished,
      description: post.description,
    });
  });

  writeFileSync("../public/rss.xml", feed.xml({ indent: true }));
};

generate();

console.log("✅ RSS Feed created");
