import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;
export const prisma = new PrismaClient();

// ❗️ Implement this class much later, once everything works fine with your mock db
export class AuthenticationService implements IAuthenticationService {
  // ⭐️ _db should be a reference to your real database driver
  readonly _db: any;
  async findUserByEmail(email: string): Promise<IUser> {
    try {
      const user = await prisma.user.findFirst({
        where: {email: email}
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
          password: password
        }
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async createUser(user: IUser): Promise<IUser> {
    try {
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          username: user.username
        }
      })
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
}


