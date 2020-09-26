import {videos} from '../db'
import routes from '../route'

export const home = (req, res) => {
    res.render("home", {pageTitle: "Home", videos})
}; // 첫번째는 response 로 할 object , 두번째는 template에 전달해줄 object

export const getUpload = (req, res) => res.render("upload", {pageTitle: "upload"});

export const postUpload = (req, res) => {
    const {
        body: {
            file, title, description
        } 
    } = req
    // To Do : Upload and video
    res.redirect(routes.videoDetail(12312))
};

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "videoDetail"});

export const search = (req, res) => {
    const serchingBy = req.query.term; // 사용자가 입력한 값을 받는것.
    res.render("Search", {pageTitle: "Search", searchingFor: serchingBy, videos});
}



export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "editVideo"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "deleteVideo"});
