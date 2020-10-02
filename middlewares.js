import routes from "./route";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

// 전역 변수로 만들어주는 것
export const localsMiddlerWare = (req, res, next) => {
  res.locals.siteName = "RoachTube";
  res.locals.routes = routes;
  // req.user는 passport 의 deseriallize 로 부터 온다
  res.locals.loggedUser = req.user || null; // 인증되지않았을때도 일단 창은떠야되니깐.
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
//TO DO : upload user 랑 매칭이되야 들어가게 만들어야됨.
export const onlyPrivate = (req, res, next) => {
  if (req.next) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

// 한가지파일만 업로드가능
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvartar = multerAvatar.single("avatar");
