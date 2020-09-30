import passport from "passport";
import GitbhubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import {
  githubLoginCallback,
  kakaoCallback,
} from "./controllers/userController";
import routes from "./route";

const kakaokey = {
  clientID: process.env.KAKAO_REST,
  callbackURL: `http://localhost:4000${routes.kakaoCallBack}`,
};
passport.use(User.createStrategy());
passport.use(
  new GitbhubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallBack}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    kakaokey,
    async (accessToken, refreshToken, profile, done) => {
      const {
        _json: {
          id,
          properties: { nickname, profile_image },
          kakao_account: { email },
        },
      } = profile;
      console.log(profile);
      try {
        const user = await User.findOne({ email });
        if (user) {
          user.kakaoID = id;
          user.avartarURL = profile_image;
          user.save();
          return done(null, user);
        }
        const newUser = await User.create({
          email,
          avartarURL: profile_image,
          name: nickname,
          kakaoID: id,
        });
        return done(null, newUser);
      } catch (error) {
        if (email === null) {
          alert("카카오 email 이 공개되어 있지않습니다.");
        }
        return done(error);
      }
    }
  )
);

// 이 routine은 쿠키에 id를 담고, id를 deserialize 해서 유저를 식별하는 과정인데 우리는 mongoosepassport 를 이용해서 간결하게 사용
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
