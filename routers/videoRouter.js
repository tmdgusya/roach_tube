import express from "express"
import routes from "../route"
import { video, upload, editVideo, deleteVideo, videoDetail } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.upload, upload);

videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);


export default videoRouter;