import { fuchsia } from "color-name";
import routes from "../route";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("Join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password) {
    res.status(400).end(); // 잘못됬다는 상태코드
    res.render("join");
  } else {
    //To Do : Register User
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
    //To Do : Log users
  }
  res.render("Join", { pageTitle: "Join" });
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "login" });
};

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const logout = (req, res) => {
  //To Do : Process Log out
  res.redirect(routes.home);
};
export const users = (req, res) => res.render("users", { pageTitle: "users" });

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "editProfile" });

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "userDetail" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "changePassword" });
