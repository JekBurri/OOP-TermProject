import { Post } from "./Post";

export class User {
    static uniqueUsers: number = 0;
    userId: number = 200000000;
    email: string; // TODO - create an email type
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    posts: Post[];
    
    constructor(email: string, password: string, firstName: string, lastName: string, username: string) {
        this.userId = this.userId + User.uniqueUsers;
        User.uniqueUsers += 1;

        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }

}