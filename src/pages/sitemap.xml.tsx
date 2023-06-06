import { getDatabase } from "@/lib/notion";
import { GetServerSideProps } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { domain } from "@/config";

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Fetch necessary data for the sitemap
  const { results: posts } = await getDatabase(
    process.env.NOTION_DATABASE_ID,
    100
  );

  // Create a sitemap stream
  const stream = new SitemapStream({ hostname: domain }); // Replace with your own domain

  // Add URLs to the sitemap
  stream.write({ url: "/", changefreq: "daily", priority: 0.8 });
  posts.forEach((post) => {
    stream.write({
      url: `/${post.url}`,
      changefreq: "weekly",
      priority: 0.5,
    });
  });

  stream.end();

  // Generate the sitemap XML
  const sitemapXml = await streamToPromise(Readable.from(stream)).then((data) =>
    data.toString()
  );

  // Set the response headers
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemapXml);
  res.end();

  return { props: {} };
};

export default Sitemap;
