## request 했을때 query
* 객체 방식으로 저장된다.
<pre><code>
input(type="text", placeholder = "Search by term...", name="term")
    .header__column
</code></pre>
* if input "roach"
* term=roach
* console.log(req.query.term); ---> term:'roach' 라고 object 형태로 저장되어 있다.