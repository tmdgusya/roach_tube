import routes from '../route'
import Video from '../models/Video'

export const home = async(req, res) => {
    try{
        const videos = await Video.find({}).sort({'_id':-1});
        res.render("home", {pageTitle: "Home", videos});
    }catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos : [] });
    }
}; // 첫번째는 response 로 할 object , 두번째는 template에 전달해줄 object

export const getUpload = (req, res) => res.render("upload", {pageTitle: "upload"});

export const postUpload = async(req, res) => {
    // To Do : Upload and video
    const {
        body:{ title, description}, 
        file:{ path}
    } = req;

    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description
    });
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req, res) => {
    const {
        params: {id}
    } = req;
    try{
        const video = await Video.findById(id);
        res.render("videoDetail", {pageTitle: video.title , video});
    }catch(CastError){
        console.log("해당 비디오 파일은 존재하지 않습니다.")
        res.redirect(routes.home);
    }      
}
    

export const search = (req, res) => {
    const serchingBy = req.query.term; // 사용자가 입력한 값을 받는것.
    res.render("Search", {pageTitle: "Search", searchingFor: serchingBy, videos});
}


export const getEditVideo = async(req, res) => {
    const {
        params: {id}
    } = req;
    try{
        const video = await Video.findById(id);
        console.log(video)
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});
    }catch(error){
        res.redirect(routes.home);
    }
};

export const postEditVideo = async(req, res) => {
   const {
       params: {id},
       body: {title, description}
   } = req;
   try{
        console.log(title, description)
        await Video.findOneAndUpdate({_id : id}, {title, description});
        res.redirect(routes.videoDetail(id));
   }catch(error){
        res.redirect(routes.home);
   }
};

export const deleteVideo = async(req, res) => {
    const {
        params: {id}
    } = req;
    try{
        await Video.findOneAndRemove({_id: id});
        res.redirect(routes.home);
    }catch(error){
        res.redirect(routes.home);
    }
};
