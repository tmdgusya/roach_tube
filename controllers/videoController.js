import routes from "../route";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    res.render("home", { pageTitle: "Home", videos: [] });
  }
}; // 첫번째는 response 로 할 object , 두번째는 template에 전달해줄 object

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "upload" });

export const postUpload = async (req, res) => {
  // To Do : Upload and video
  const {
    body: { title, description },
    file: { path },
    user,
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: user.id,
    author: user.name,
  });
  user.videos.push(newVideo.id);
  user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    video.views += 1;
    video.save();
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (CastError) {
    console.log("해당 비디오 파일은 존재하지 않습니다.");
    console.log(CastError);
    res.redirect(routes.home);
  }
};

export const search = async (req, res) => {
  // const serchingBy = req.query.term;
  const {
    query: { term: searchingBy },
  } = req;
  let videos = []; // const 는 사용하면 안됨 계속해서 찾으므로
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
    res.render("search", { pageTitle: search, searchingBy, videos });
  } catch (error) {
    console.log(error);
  }
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    console.log(video);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  console.log(req);
  try {
    await Video.findOneAndRemove({ _id: id });
    const idx = user.videos.findIndex((element) => element == id);
    console.log(idx);
    user.videos.splice(idx, 1);
    user.save();
    res.redirect(routes.home);
  } catch (error) {
    res.redirect(routes.home);
  }
};

// api

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user,
      author: user.name,
      author__profile: req.user.avartarURL,
    });
    video.comments.push(newComment._id);
    video.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
