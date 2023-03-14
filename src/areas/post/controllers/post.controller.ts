import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { PostService } from "../services";

import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  public service: IPostService = new PostService();

  constructor() {
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
      this.service.getAllPosts()
        .then((posts) => {
          console.log(posts);
          res.render("post/views/posts", { posts });
        })
    } catch (error) {
      console.log(error);
    }
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service.findById(req.params.id)
        .then((post) => {
          res.render("post/views/post", { post });
        })
    } catch (error) {
      console.log(error);
    }
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = {
        userId: req.params.userId,
        message: req.body.message
      }
      const postId = req.body.postId;
      this.service.addCommentToPost(message, postId);
    } catch (error) {
      console.log(error);
    }
  };

  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service.addPost(req.body);
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
