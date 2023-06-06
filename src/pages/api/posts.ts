//next.js api handler

import { getDatabase } from "@/lib/notion";

export default async function handler(req, res) {
  //switch on req.method
  //if GET, return all posts
  //if POST, create new post
  switch (req.method) {
    case "GET":
      const databaseId = process.env.NOTION_DATABASE_ID;
      const limit = req.query.limit ? parseInt(req.query.limit) : 9;
      const startCursor = req.query.startCursor ? req.query.startCursor : null;
      const response = await getDatabase(databaseId, limit, startCursor);
      return res.status(200).json(response);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
