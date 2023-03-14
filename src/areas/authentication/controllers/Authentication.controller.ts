import express, { NextFunction } from "express";
import IController from "../../../interfaces/controller.interface";
import { AuthenticationService, IAuthenticationService } from "../services";
import { posts, getUsers } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import User from "../../../model/user";

import bcrypt from 'bcrypt';


class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();
  public service:IAuthenticationService = new AuthenticationService();

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
    const password = req.body.password;
    this.service.getUserByEmailAndPassword(email, password)
      .then((user) => {
        bcrypt.compare(req.body.getUserByEmailAndPassword, user.password)
                  .then((result) => result && user)
                  .then((data) => {
                    (data)
                      ? res.render('post/views/posts', { posts: posts, session: (req.session as any).email })
                      : res.render("authentication/views/login", { error: "Incorrect credentials!!" });
                  })
      })
  };

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let sendService = new Promise<any>((resolve:any,reject:any)=>{
      resolve(this.service);
    })
    sendService.then((service:any)=>{
      bcrypt.hash(req.body.password, 12, function (err, hash) {
        let user = new User(req.body.email, hash, req.body.firstName, req.body.lastName);
        (req.session as any).email = req.body.email;
        service.createUser(user)
          .then((data) => {
            console.log(data);
            res.render('post/views/posts', { posts: posts })
        });
      });
    })
  }


  private logout = async (req: express.Request, res: express.Response, next: NextFunction) => {
    (req.session as any).email = null;
    res.clearCookie('connect.sid');
    res.redirect('/')
  };
}

export default AuthenticationController;
