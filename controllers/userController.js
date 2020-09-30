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

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(profile);
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      user.githubID = id;
      user.avartarURL = avatar_url;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      avartarURL: avatar_url,
      name,
      githubID: id,
    });
    return cb(null, newUser);
  } catch (error) {
    if (email === null) {
      alert("Github email 이 공개되어 있지않습니다.");
      window.open("https://github.com/settings/profile");
    }
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  //To Do : Process Log out
  req.logout();
  res.redirect(routes.home);
};
export const users = (req, res) => res.render("users", { pageTitle: "users" });

export const me = (req, res) => {
  res.render("userDetail", { pageTitle: "userDetail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "userDetail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "editProfile", user: req.user });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "changePassword" });
