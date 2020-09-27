## request 했을때 query

- 객체 방식으로 저장된다.
<pre><code>
input(type="text", placeholder = "Search by term...", name="term")
    .header__column
</code></pre>
- if input "roach"
- term=roach
- console.log(req.query.term); ---> term:'roach' 라고 object 형태로 저장되어 있다.

## 형식 체크에는 Regex 이용

<http://regex101.com>

videos = await Video.find({ title: { $regex: searchingBy, $options: "i"} });

대소문자 구분않고, 포함된단어들이 있는걸 계속해서 찾는거
