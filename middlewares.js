import routes from "./route";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });

// 전역 변수로 만들어주는 것
export const localsMiddlerWare = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

// 한가지파일만 업로드가능
export const uploadVideo = multerVideo.single("videoFile");
