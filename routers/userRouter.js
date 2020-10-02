import express from "express";
import routes from "../route";
import {
  users,
  changePassword,
  getEditProfile,
  postEditProfile,
  postChangePassword,
  getChangePassword,
  userDetail,
} from "../controllers/userController";
import { onlyPrivate, uploadAvartar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.users, users);
// userRouter.get(routes.userDetail(), onlyPrivate, me);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(
  routes.editProfile,
  onlyPrivate,
  uploadAvartar,
  postEditProfile
);
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);
export default userRouter;
