import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import { posts, getUsers } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import User from "../../../model/user";

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
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/login");
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/register");
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = (req: express.Request, res: express.Response) => {
    const email = req.body.email;
    const password = req.body.password;
    getUsers()
      .then((users: IUser[]) => {
        let userData = users.map((user: IUser) => {
          if (user.email === email && user.password === password) {
            return user;
          }
        })
        return userData;
      }).then((data) => {
        if (data) {
          res.render('post/views/posts', { posts: posts });
        }
      })
  };

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let user = new User(req.body.email, req.body.password, req.body.firstName, req.body.lastName)
    this.service.createUser(user.getUser()).then((data) => {
      getUsers().then((newUsers: IUser[]) => {
        console.log(newUsers);
      })
      res.render('post/views/posts', { posts: posts })
    });
  };
  private logout = async (req: express.Request, res: express.Response) => {
    res.redirect("/")
  };
}

export default AuthenticationController;
