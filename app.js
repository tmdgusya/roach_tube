import express from "express"; // const express = require('express');
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./route";
import mongoose, { Mongoose } from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import { localsMiddlerWare } from "./middlewares";
import "./passport";

const app = express();
const CookieStore = MongoStore(session);

app.use(helmet()); // Security 용
mongoose.set("useFindAndModify", false);
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
/* MIDDLEWARE START LINE */
app.use(cookieParser()); // 유저로 부터 받은 cookie 를 이해하는 과정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 유저로 부터 받은 data를 이해하는 과정
app.use(morgan("dev")); // Logger Middle Ware
app.use(
  session({
    secret: process.env.COOKIE_SECRETE,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);
app.use(passport.initialize()); // passport 는 cookie 밑에 써줘야됨. 그래야 정보수신가능
app.use(passport.session());
app.use(localsMiddlerWare);
/* MIDDLEWARE END LINE */

//Router START LINE
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
//Router END LINE

export default app; // 누군가 내 파일을 불러올때 app object 를 사용가능하게 하는것
