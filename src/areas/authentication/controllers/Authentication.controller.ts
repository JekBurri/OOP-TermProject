import express, { NextFunction } from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import { posts, getUsers } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import User from "../../../model/user";
import bcrypt from 'bcrypt';

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();

  private service: IAuthenticationService;
  constructor(service: IAuthenticationService) {
    this.service = service;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/logout`, this.logout);

    this.router.post(`${this.path}/logout`, this.logout);

  }

  private showLoginPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/login", { error: "" });
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/register", { error: "" });
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = (req: express.Request, res: express.Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;
    getUsers()
      .then((users: IUser[]) => {
        users.map((user: IUser) => {
          if (user.email === email) {
            bcrypt.compare(password, user.password)
              .then((result) => {
                if (result) {
                  return user;
                }
              }).then((data) => {
                if (data) {
                  res.render('post/views/posts', { posts: posts, session: (req.session as any).email });
                } else {
                  res.render("authentication/views/login", { error: "Incorrect credentials!!" });
                }
              })
          }
        })
      })
  };

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    getUsers().then((users: IUser[]) => {
      let userExist = false;
      users.forEach((user) => {
        if (user.email === req.body.email) {
          userExist = true;
        }
      })
      let service = this.service;
      return { userExist, service };
    }).then((data) => {
      if (data.userExist) {
        res.render("authentication/views/register", { error: "User already exists" });
      } else {
        bcrypt.hash(req.body.password, 12, function (err, hash) {
          let user = new User(req.body.email, hash, req.body.firstName, req.body.lastName);
          (req.session as any).email = req.body.email;
          data.service.createUser(user)
            .then((data) => {
              console.log(data);
              res.render('post/views/posts', { posts: posts })
            });
        });
      }
    })
  };
  private logout = async (req: express.Request, res: express.Response, next: NextFunction) => {
    (req.session as any).email = null;
    res.clearCookie('connect.sid');
    res.redirect('/')
  };
}

export default AuthenticationController;
