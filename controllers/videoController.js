import routes from "../route";
import Video from "../models/Video";

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
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    console.log(video);
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
    console.log(title, description);
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
    res.redirect(routes.home);
  } catch (error) {
    res.redirect(routes.home);
  }
};
