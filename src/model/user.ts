import IPost from "../interfaces/post.interface";
import IUser from "../interfaces/user.interface";
import { getUsers } from "./fakeDB";

export default class User implements IUser {
    id: string;
    username: string;
    public email: string;
    password: string;
    firstName: string;
    lastName: string;
    posts?: IPost[];
    following?: string[];

    constructor(email, password, firstName, lastName) {
        getUsers().then((users: IUser[]) => {
            let id = "1";
            if (users) {
                id = String(parseInt(users[users.length - 1].id) + 1);
            }
            this.setId(id);
            this.setEmail(email);
            this.setFirstName(firstName);
            this.setLastName(lastName);
            this.setPassword(password);
            this.setUserName(lastName.toLowerCase() + firstName.toLowerCase())
        }).catch((err) => {
            console.log(err);
        })
    }

    setId(id: string) {
        this.id = id;
    }
    setFirstName(name: string) {
        this.firstName = name;
    }
    setLastName(name: string) {
        this.lastName = name;
    }
    setPassword(password: string) {
        this.password = password;
    }
    setEmail(email: string) {
        this.email = email;
    }
    setUserName(userName: string) {
        this.username = userName;
    }

    getUser(): IUser {
        return {
            id: this.id,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            posts: this.posts,
            following: this.following,
            password: this.password
        }
    }

}

