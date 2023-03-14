import App from "./App";
import PostController from "./areas/post/controllers/post.controller";
import LandingController from "./areas/landing/controllers/Landing.controller";
import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { PostService } from "./areas/post/services";

const server = new App([
  new LandingController(),
  new PostController(new PostService()),
  new AuthenticationController(),
]);

server.start();
