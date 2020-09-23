# ROUTER ??

* 경로를 지정해주는 것과 동시에 url 당 handling 을 어떻게 할건지도 정한다 예시

<pre><code>

export const userRouter = express.Router();

userRouter.get("/", (req, res) => res.send('user index'));
userRouter.get("/edit", (req, res) => res.send('user edit'));
userRouter.get("/password", (req, res) => res.send('user password'));
</code></pre>

*다른 곳에서 import 해서 사용하며*

app.use(/user , userRouter) 라고하면 

/user url 일때는 home 에관련된 user index 핸들링 처리가

/user/edit 일때는 user edit 에 관련된 처리가 진행된다.