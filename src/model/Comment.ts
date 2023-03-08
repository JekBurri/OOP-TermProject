import User from "./user";
export class Comment {
    static uniqueComment: number = 0;
    commentId: number = 3000000000000;
    createdAt: Date;
    userId: number;
    message: string;

    constructor(userId: number, message: string) {
        this.commentId = this.commentId + Comment.uniqueComment;
        Comment.uniqueComment += 1;

        this.createdAt = new Date();
        this.userId = userId;
        this.message = message;
    }
}