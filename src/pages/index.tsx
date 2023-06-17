import React, { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'

import { databaseId } from '@/config'
import { getBlocks, getDatabase, getPage } from '@/lib/notion'
import { renderBlock } from '@/utils/renderBlock'

import { BlogSection } from '@/components/BlogSection'
import { Img } from '@/components/Img'
import { Layout } from '@/components/layouts/Layout'
import { Post } from '@/types/Post'

export default function Home({ posts, page, startCursor, blocks, hasMore }) {
  const [items, setItems] = useState(posts)
  const [isLoading, setIsLoading] = useState(false)
  const [cursor, setCursor] = useState(startCursor)
  const [isMore, setIsMore] = useState(hasMore)

  // Simulated API call to fetch more items
  const fetchMoreItems = async (cursor) => {
    setIsLoading(true)
    const limit = 9
    const response = await fetch(
      '/api/posts?limit=' +
        limit +
        '&startCursor=' +
        cursor +
        '&tm=' +
        new Date().getTime()
    )
    const database = await response.json()
    const newItems = database.results
    setCursor(database.startCursor)
    setIsMore(database.hasMore)

    setItems((prevItems) => [
      ...prevItems,
      ...newItems.filter(
        ({ id: id1 }) => !prevItems.some(({ id: id2 }) => id2 === id1)
      )
    ])
    setIsLoading(false)
  }

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      if (isMore) {
        fetchMoreItems(cursor)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [cursor, isMore]) // Update the effect dependencies to include cursor and isMore

  return (
    <Layout>
      <Head>
        <title>{page?.properties?.title.title[0].plain_text}</title>
      </Head>
      <>
        {page?.cover && (
          <div>
            <Img
              src={page.cover}
              alt={page?.properties.title.title[0].plain_text}
              maxHeight={'30vh'}
              className='object-cover w-full'
            />
            <div className='container border-2'>
              <Img
                src={page.icon}
                alt={page.properties.title.title[0].plain_text}
                maxHeight={70}
                className='rounded-full w-[70px] h-[70px] absolute left-10 -top-9'
              />
            </div>
          </div>
        )}
        <div className='max-w-screen-xl px-4 mx-auto -mt-20 bg-white sm:px-6 lg:px-8'>
          <div className='max-w-2xl pt-32 pb-12 mx-auto prose text-center lg:prose-xl'>
            {blocks?.map((block, i) => (
              <Fragment key={block.id + '-' + i}>{renderBlock(block)}</Fragment>
            ))}
          </div>
          <BlogSection posts={items} />
        </div>
      </>
    </Layout>
  )
}

function getPostTitle(post: Post) {
  return post.properties.Name.title[0].plain_text
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId)
  const page = await getPage(process.env.ROOT_PAGE_ID)
  const blocks = await getBlocks(process.env.ROOT_PAGE_ID)
  const posts: Post[] = database.results as Post[]
  // console.log('post titles', posts.map(getPostTitle))

  return {
    props: {
      page,
      posts: posts,
      startCursor: database.startCursor,
      hasMore: database.hasMore,
      blocks
    },
    revalidate: 120
  }
}
