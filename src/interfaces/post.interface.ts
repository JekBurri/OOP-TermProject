import IComment from "./comment.interface";

interface IPost {
  id: string;
  message: string;
  userId: string;
  createdAt: Date;
  commentList?: Array<IComment>;
  likes: number;
<<<<<<< HEAD
  comments?: number;
=======
  comments: number;
>>>>>>> 1e1a2985cb299b9da523893d11ab7dfb429ad13c
}

export default IPost;
