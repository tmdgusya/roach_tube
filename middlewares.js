import routes from "./route";

// 전역 변수로 만들어주는 것
export const localsMiddlerWare = (req, res, next) => {
    res.locals.siteName = 'Wetube';
    res.locals.routes = routes;
    next();
};