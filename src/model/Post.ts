
export class Post {
    static uniqueUsers: number = 0;
    postId: number = 100000000;
    userId: number;
    createdAt: Date;
    message: string;
    comments: number;
    likes: number;
    commentList: Comment[];

    constructor(user:number,message:string) {
        this.postId = this.postId + Post.uniqueUsers;
        Post.uniqueUsers += 1;

        this.userId = user;
        this.createdAt = new Date();
        this.message = message;
        this.comments = 0;
        this.likes = 0;
        this.commentList = [];

    }
}