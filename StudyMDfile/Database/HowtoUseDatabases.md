## DataBase 설계시

반드시 핸들링 처리 함수들을 사용하여 현재 Status 를 확인할수 있게끔 한다.


## 값들을 모델링해와야 할시

반드시 async를 이용하거나 함수를 분리하도록 한다. JavaScript는 다중 작업이 가능하여, DB를 모델값들을 가져오면서도 렌더링을 진행한다.
따라서 작업의 진행도를 기다리는 async 함수를 기용하도록 한다.

## Example 

*videos model 을 가져오기전까지 render를 실행시키지 않게함*

<pre><code>
const videos = await Video.find({});
res.render("home", {pageTitle: "Home", videos})
</code></pre>

*위와 같은 방식은 database의 문제가 있어도 render가 가능함, 오류로 await이 종료가 될 수 있기 때문에*
*따라서 우리는 try .. catch 를 이용해줘야함*

<pre><code>
 try{
        const videos = await Video.find({});
    }catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos})
    }
</code></pre>

*궁금하면 Error 를 throw 해서 실험해보아라*
*Error 를 test 하는 것도 정말 중요한 공부다!*


<pre><code>
    try{
        const videos = await Video.find({});
        throw Error("fucking error");
        res.render("home", {pageTitle: "Home", videos});
    }catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos : [] });
    }
</code></pre>

*해당 실험과정에 대한 log*
<pre><code>
Error: fucking error
    at _callee$ (/Users/jeongseunghyeon/Desktop/development/youtubeclone/controllers/videoController.js:6:15)
    at tryCatch (/Users/jeongseunghyeon/Desktop/development/youtubeclone/node_modules/regenerator-runtime/runtime.js:63:40)
    at Generator.invoke [as _invoke] (/Users/jeongseunghyeon/Desktop/development/youtubeclone/node_modules/regenerator-runtime/runtime.js:293:22)
    at Generator.next (/Users/jeongseunghyeon/Desktop/development/youtubeclone/node_modules/regenerator-runtime/runtime.js:118:21)
    at asyncGeneratorStep (/Users/jeongseunghyeon/Desktop/development/youtubeclone/controllers/videoController.js:14:103)
    at _next (/Users/jeongseunghyeon/Desktop/development/youtubeclone/controllers/videoController.js:16:194)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
GET / 304 35.074 ms - -
</code></pre>