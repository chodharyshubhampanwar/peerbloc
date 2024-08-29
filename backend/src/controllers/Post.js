import { prisma } from "../db/db.js";

export const createPost = async (req, res) => {
  const { title, content, userId, blocId } = req.body;
  const post = await prisma.post.create({
    data: { title, content, userId, blocId },
  });
  res.json(post);
};

export const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};
