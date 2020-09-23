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

* 경로 파일 자체도 다른 파일로 분류하여 저장함