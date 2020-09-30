import express from "express";
import routes from "../route";
import { home, search } from "../controllers/videoController";
import {
  getLogin,
  postLogin,
  postJoin,
  getJoin,
  logout,
  githubLogin,
  githubLoginCallback,
  postGithubLogin,
  me,
  postSocialLogin,
  kakaoLogin,
  kakaoCallback,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallBack,
  passport.authenticate("github", {
    failureRedirect: routes.login,
  }),
  postSocialLogin
);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallBack,
  passport.authenticate("kakao", {
    failureRedirect: routes.login,
  }),
  postSocialLogin
);

globalRouter.get(routes.me, me);

export default globalRouter;
