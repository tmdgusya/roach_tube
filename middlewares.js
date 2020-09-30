import routes from "./route";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });

// 전역 변수로 만들어주는 것
export const localsMiddlerWare = (req, res, next) => {
  res.locals.siteName = "RoachTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null; // 인증되지않았을때도 일단 창은떠야되니깐.
  next();
};

// 한가지파일만 업로드가능
export const uploadVideo = multerVideo.single("videoFile");
