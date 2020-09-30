import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

// 이 routine은 쿠키에 id를 담고, id를 deserialize 해서 유저를 식별하는 과정인데 우리는 mongoosepassport 를 이용해서 간결하게 사용
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
