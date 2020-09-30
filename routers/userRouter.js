import express from "express";
import routes from "../route";
import {
  users,
  userDetail,
  editProfile,
  changePassword,
  me,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.users, users);
// userRouter.get(routes.userDetail(), onlyPrivate, me);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);

export default userRouter;
