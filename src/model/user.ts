import IPost from "../interfaces/post.interface";
import IUser from "../interfaces/user.interface";
import { getUsers } from "./fakeDB";

import { PrismaClient } from "@prisma/client";
import Prisma from '@prisma/client';
const prisma = new PrismaClient();



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
        this.setEmail(email);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setPassword(password);
        this.setUserName(lastName.toLowerCase() + firstName.toLowerCase())
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

