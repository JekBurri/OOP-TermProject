import IPost from "../../../interfaces/post.interface";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  addPost(post: IPost): void;

  sortPosts(posts: IPost[]): Promise<IPost[]>;

  getAllPosts(): Promise<IPost[]>;

  findById(id: string): Promise<IPost> | undefined;

  addCommentToPost(
    message: { id: string; userId: string; message: string },
    postId: string
  ): Promise<void>;
}
