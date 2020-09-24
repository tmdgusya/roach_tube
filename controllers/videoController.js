export const home = (req, res) => res.render("home", {pageTitle: "Home", potato:1234}); // 첫번째는 response 로 할 object , 두번째는 template에 전달해줄 object

export const search = (req, res) => {
    const serchingBy = req.query.term; // 사용자가 입력한 값을 받는것.
    res.render("Search", {pageTitle: "Search", searchingFor: serchingBy});
    next();
};

export const videos = (req, res) => res.render("videos", {pageTitle: "videos"});

export const upload = (req, res) => res.render("upload", {pageTitle: "upload"});

export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "editVideo"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "deleteVideo"});

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "videoDetail"});