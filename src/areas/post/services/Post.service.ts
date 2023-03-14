import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  async addPost(post: IPost): Promise<IPost> {
    try {
      const newPost = await prisma.post.create({
        data: {
          createdAt: new Date(),
          message: post.message,
          userId: post.userId,
          likes: 0
        }
      })
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllPosts(): Promise<IPost[]> {
    try {
      const posts = await prisma.post.findMany()
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id: string): Promise<IPost> {
    try {
      const post = await prisma.post.findFirst({
        where: {
          id: id
        }
      })
      return post;
    } catch (error) {
      console.log(error);
    }
  }
  async addCommentToPost(message: { userId: string; message: string }, postId: string): Promise<void> {
    try {
      const comment = await prisma.comment.create({
        data: {
          userId: message.userId,
          message: message.message,
          createdAt: Date(),
          postId: postId
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async sortPosts(posts: IPost[]): Promise<IPost[]> {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          id: 'asc'
        }
      })
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
}
