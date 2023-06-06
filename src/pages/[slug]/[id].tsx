import Head from "next/head";
import { getBlocks, getDatabase, getPage } from "@/lib/notion";
import Link from "next/link";

import React, { Fragment } from "react";
import { Text } from "@/components/Text";
import { Img } from "@/components/Img";
import { Header } from "@/components/Header";
import { renderBlock } from "@/utils/renderBlock";
import { databaseId } from "@/config";
import { Layout } from "@/components/layouts/Layout";

export default function Post({ page, blocks }) {
  React.useEffect(() => {
    if (page) {
      //do something
    }
  }, []);

  if (!page || !blocks) {
    return <div />;
  }

  return (
    <Layout>
      <Head>
        <title>{page.properties.Name.title[0].plain_text}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/monokai-sublime.min.css"
        />
        {page?.cover?.external?.url && (
          <meta property="og:image" content={page.cover.external.url} />
        )}
        {page?.properties?.Name.title[0].plain_text && (
          <meta
            property="og:title"
            content={page.properties.Name.title[0].plain_text}
          />
        )}
      </Head>
      <>
        {page?.cover && (
          <div>
            <Img
              src={page.cover}
              alt={page.properties.Name.title}
              maxHeight={"40vh"}
            />
          </div>
        )}
        <article className="prose lg:prose-xl mx-auto px-5 py-10">
          <h1>
            <Text text={page.properties.Name.title} />
          </h1>
          <section>
            {blocks.map((block) => (
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
            <Link
              href="/"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline"
            >
              ← Go home
            </Link>
          </section>
        </article>
      </>
    </Layout>
  );
}

export const getStaticPaths = async (context) => {
  const database = await getDatabase(databaseId);

  let out = {
    paths: database?.results?.map((page: any) => ({
      params: { id: page.id, slug: page.slug },
    })),
    fallback: true,
  };

  return out;
};

export const getStaticProps = async (context) => {
  const { id, slug } = context.params;
  console.log("id", id);
  console.log("slug", slug);
  try {
    const page = await getPage(id);
    const blocks = await getBlocks(id);
    return {
      props: {
        page,
        blocks,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
