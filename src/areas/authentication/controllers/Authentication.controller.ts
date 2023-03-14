import express, { NextFunction } from "express";
import IController from "../../../interfaces/controller.interface";
import { AuthenticationService, IAuthenticationService } from "../services";
import IUser from "../../../interfaces/user.interface";
import User from "../../../model/user";
import { PostService } from "../../../areas/post/services";
import bcrypt from 'bcrypt';
import IPostService from "../../../areas/post/services/IPostService";


class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();
  public service: IAuthenticationService = new AuthenticationService();
  public postService: IPostService = new PostService();
  constructor() {
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
    this.service.findUserByEmail(email).then((user) => {
      user ?
        bcrypt.compare(req.body.password, user.password)
          .then((result) => result && user)
          .then((data) => {
            if (data) {
              (req.session as any).user = data;
              this.postService.getAllPosts().then((posts) => {
                (req.session as any).user = data;
                res.render('post/views/posts', { posts: posts, session: (req.session as any).user, user: data })
              })
            } else {
              res.render("authentication/views/login", { error: "Incorrect credentials!!" });
            }
          })
        : res.render("authentication/views/login", { error: "Incorrect credentials!!" });
    })
  };

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let sendService = new Promise<any>((resolve: any, reject: any) => {
      let userService = this.service;
      let postService = this.postService;
      resolve({ userService, postService });
    })
    sendService.then((service: any) => {
      bcrypt.hash(req.body.password, 12, function (err, hash) {
        let user = new User(req.body.email, hash, req.body.firstName, req.body.lastName);
        service.userService.createUser(user)
          .then((data) => {
            (req.session as any).user = data;
            service.postService.getAllPosts().then((posts) => {
              res.render('post/views/posts', { posts: posts, user: data })
            })
          });
      });
    })
  }


  private logout = async (req: express.Request, res: express.Response, next: NextFunction) => {
    (req.session as any).user = null;
    res.clearCookie('connect.sid');
    res.redirect('/')
  };
}

export default AuthenticationController;
