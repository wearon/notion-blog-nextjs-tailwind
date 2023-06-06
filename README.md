# Notion Next Blog Starter with Tailwind CSS and Typescript

### Credits

#### Thanks to @samuelkraft and @transitive-bullshit

### Enhancements to the original project by @samuelkraft

- [x] Added Sitemap.xml
- [x] Infinite Scrolling of posts
- [x] Converted to Typescript [not generated types]
- [x] Added Tailwind CSS with typography plugin
- [x] Added Bundle Analyzer that you can run with `yarn analyze`
- [x] Syntax highlighting with react-highlight
- [x] Notion DB to duplicate by @transitive-bullshit https://transitive-bs.notion.site/Next-js-Notion-Starter-Kit-Template-7875426197cf461698809def95960ebf
- [x] Homepage also controlled by Notion Page
- [x] Added Cover Images
- [x] Home page also displays Icon, configured in .env as ROOT_PAGE_ID
- [x] Added a Nav that can be customized using config.ts
- [x] Fixed blank class issue where className = multiple whitespaces " "
- [x] Added tags [for display only]

### Why not use @transitive-bullshit's NextJS Notion Starter Kit?

I noticed that the HTML is generates is not very semantic, and it's not very customizable. I wanted to use Tailwind CSS and have more control over the HTML. I also wanted to use Typescript and have a better understanding of how the code works. I also wanted to add a few features like infinite scrolling and syntax highlighting. So when I came across the solution by @samuelkraft I decided to enhance it with the features I wanted.

### What I learned

- [x] Rootpage and DB both need to be "published to web" via "Share" button
- [x] Main page and DB both have to be added to an Integration, Integration is basically like an "intention", an "intention" of generating API key
- [x] Even though DB/Page is public you still have to click on "..." > Add Connections > Pick integration

This is a [Next.js](https://nextjs.org/) blog using [Notions Public API](https://developers.notion.com).

**How-it-works/Documentation:** [https://samuelkraft.com/blog/building-a-notion-blog-with-public-api](https://samuelkraft.com/blog/building-a-notion-blog-with-public-api)

## Getting Started

First, follow Notions [getting started guide](https://developers.notion.com/docs/getting-started) to get a `NOTION_TOKEN` and a `NOTION_DATABASE_ID`, then add them to a file called `.env.local`.

As a reference here's the Notion table I am using: https://www.notion.so/5b53abc87b284beab0c169c9fb695b4d?v=e4ed5b1a8f2e4e12b6d1ef68fa66e518

```
NOTION_TOKEN=
NOTION_DATABASE_ID=
```

Install dependencies

```bash
yarn
```

Start the server with

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
