import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { post, posts } from "../../../model/fakeDB";

import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

class PostController implements IController {
  public path = "/posts";
  public router = Router();

  constructor(postService: IPostService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.get(`${this.path}/:id/delete`, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await prisma.post.findMany({
        where: {
          
        }
      })
      res.render("post/views/posts", { posts });
    } catch (error) {
      console.log(error);
    }
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await prisma.post.findFirst({
        where: {
          id: req.body.postId
        }
      })
      res.render("post/views/post", { post });
    } catch (error) {
      console.log(error);
    }
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.comment.create({
        data: {
          createdAt: Date(),
          message: req.body.message,
          postId: req.body.postId
        }
      })
    } catch (error) {
      console.log(error);
    }
  };
  
  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.post.create({
        data: {
          createdAt: Date(),
          message: req.body.message,
          userId: req.body.userId,
          comments: null,
          likes: 0,
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.post.delete({
        where: {
          id: req.body.postId
        }
      })
    } catch (error) {
      console.log(error);
    }
  };
}

export default PostController;
