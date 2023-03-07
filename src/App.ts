import express from "express";
import errorMiddleware from "./middleware/error.middleware";
import Controller from "./interfaces/controller.interface";
import dotenv from "dotenv";
import session from "express-session";

class App {
  private _app: express.Application;
  private readonly _port: number | string = process.env.PORT || 5000;

  constructor(controllers: Controller[]) {
    this._app = express();
    dotenv.config();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initilizeExpressSession();
  }

  public start() {
    this._app.listen(this._port, () => {
      console.log(`App listening on the port ${this._port}`);
    });
  }

  private initializeMiddlewares() {
    require("./middleware/express.middlewares")(this._app);
  }

  private initializeErrorHandling() {
    this._app.use(errorMiddleware);
  }

  private initilizeExpressSession() {
    this._app.use(session({
      secret: 'keyboard cat',
      cookie: { secure: true }
    }));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this._app.use("/", controller.router);
    });
  }
}

export default App;
