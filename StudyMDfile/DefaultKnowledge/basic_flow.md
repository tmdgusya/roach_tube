# BASIC_FLOW

## CREATE SERVER

<pre><code>
    const express = require('express'); // require 는 module 을 찾아오는 역할
    const app = express();

    const PORT = 4000;
</code></pre>

## CREATE ROUTE

<pre><code>
app.get("/", handleHome);
app.get("/profile", handleProfile);
</code></pre>

## CREATE RESPONSE

<pre><code>
function handleListening () {
    console.log(`Listening on: http://localhost:${PORT}`)
}

function handleHome(req, res){
    console.log(req);
    res.send("Hello from home"); // 반응 하는거
}
</code></pre>

## MIDDLEWARE

<pre><code>
const betweenHome = (req, res, next) => { // 지금 between 은 middleware 임 연결 <----> response 사이에 일어나는 함수라고 생각하면됨.
    console.log("Between");
    next(); // next 가 작동해야 response 작동
}
</code></pre>

## ROUTE

- 경로 파일 자체도 다른 파일로 분류하여 저장함

## Serialize ?

- 어떤 정보를 쿠키에게 주느냐를 의미함.
- 쿠키가 가지고 있는 data 는 어차피 브라우저가 자동으로 백엔드로 전송해줌

## DeSerialize

- 쿠키가 준 정보 만약에 쿠기가 userid : 1 이라는 data를 주면 그 데이터를 어떻게 활용할 것인지에 대한 function 이다.

## 로그인부분은 passportjs 를 헷갈리면 참고하자

- <http://www.passportjs.org/docs/authenticate/>

## Github login call back link

- http://127.0.0.1:4000/auth/github/callback
