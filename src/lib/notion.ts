import { colorToRGB } from '@/utils/rgbValues'
import { Client } from '@notionhq/client'
import { slugify } from '@/utils/slugify'
import { Post } from '@/types/Post'

export const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

export const getDatabase = async (
  databaseId,
  limit = 9,
  startCursor = undefined
) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: limit,
      start_cursor: startCursor
    })

    // generate previous and next links
    const { has_more, next_cursor, object, results } = response
    const previous = null
    response.results = response.results
      ? response.results.map((page) => formatPage(page))
      : null

    const out = {
      hasMore: has_more,
      startCursor: next_cursor,
      previous,
      object,
      results
    }
    return out
  } catch (error) {
    console.error('Error getting database\n', error)
    return null
  }
}


const formatPage = (post) => {
 
  if (post.properties?.Name?.title) {
    if (post.properties?.Name?.title.length > 1)
      {
        post.title = post.properties?.Name?.title
        .map((title) => title.plain_text)
        .join('')
      }
    else {
      post.title = post.properties.Name.title[0].plain_text
    }
  } else {
    post.title = 'No title'
  }
  switch (post?.cover?.type) {
    case 'file':
      post.cover = post.cover.file.url
      break
    case 'external':
      post.cover = post.cover.external.url
      break
    default:
      post.cover = null
  }

  switch (post?.icon?.type) {
    case 'emoji':
      post.icon = post.icon.emoji
      break
    case 'file':
      post.icon = post.icon.file.url
      break
    case 'external':
      post.icon = post.icon.external.url
      break
    default:
      post.icon = null
  }
  /**
   * Tags
   */
  if (post.properties.Tags && post.properties.Tags.multi_select) {
    post.properties.Tags.multi_select = post.properties.Tags.multi_select.map(
      (tag) => {
        if (tag.color) {
          let rgbValues = colorToRGB(tag.color)
          if (rgbValues) {
            tag.color = `rgba(${rgbValues[0]},${rgbValues[1]},${rgbValues[2]},0.2)`
          }
        }
        return tag
      }
    )

    post.properties.tags = post.properties.Tags.multi_select

    /**
     * Slugify
     */
    post.slug = slugify(post.title)

    post.url = `${post.slug}/${post.id}`
  }

  /**
   * Date [casue hydration error if formatted in the component]
   */

  if (post.last_edited_time) {
    post.updatedAt = new Date(post.last_edited_time).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    })
  }

  return post
}

export const getPage = async (pageId) => {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId })

    return formatPage(response)
  } catch (error) {
    console.error('notion.ts >> error getting page', {
      pageId,
      error
    })
    return null
  }
}

export const getBlocks = async (blockId) => {
  if (!blockId) return null
  blockId = blockId.replaceAll('-', '')

  const { results } = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100
  })

  // Fetches all child blocks recursively - be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = results.map(async (block) => {
    //@ts-ignore
    if (block.has_children) {
      const children = await getBlocks(block.id)
      return { ...block, children }
    }
    return block
  })

  return await Promise.all(childBlocks).then((blocks) => {
    return blocks.reduce((acc, curr) => {
      if (curr.type === 'bulleted_list_item') {
        if (acc[acc.length - 1]?.type === 'bulleted_list') {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr)
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: 'bulleted_list',
            bulleted_list: { children: [curr] }
          })
        }
      } else if (curr.type === 'numbered_list_item') {
        if (acc[acc.length - 1]?.type === 'numbered_list') {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr)
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: 'numbered_list',
            numbered_list: { children: [curr] }
          })
        }
      } else {
        acc.push(curr)
      }
      return acc
    }, [])
  })
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
