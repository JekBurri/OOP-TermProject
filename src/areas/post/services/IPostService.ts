import IPost from "../../../interfaces/post.interface";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
<<<<<<< HEAD
  addPost(post: IPost): void;

  sortPosts(posts: IPost[]): Promise<IPost[]>;

  getAllPosts(): Promise<IPost[]>;

  findById(id: string): Promise<IPost> | undefined;

  addCommentToPost(
    message: { id: string; userId: string; message: string },
    postId: string
  ): Promise<void>;
=======
  addPost(post: IPost, username: string): void;

  sortPosts(posts: IPost[]): IPost[];

  getAllPosts(username: string): IPost[];

  findById(id: string): IPost | undefined;

  addCommentToPost(
    message: { id: string; createdAt: string; userId: string; message: string },
    postId: string
  ): IPost | void;
>>>>>>> 1e1a2985cb299b9da523893d11ab7dfb429ad13c
}
