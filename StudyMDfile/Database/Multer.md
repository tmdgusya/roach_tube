## Multer?

*Multer 는 업로드한 파일의 URL을 반환시켜줌*

* 우리는 file url을 기반으로 작동할 것이기 때문에 이게 필요함

<https://github.com/expressjs/multer/blob/master/doc/README-ko.md>

## How to save video file into that user defined server directory  

const multerVideo = multer({dest: "user_definition/"});

# Architecture
<pre><code>
{
  fieldname: 'videoFile',
  originalname: 'sample-mp4-file.mp4',
  encoding: '7bit',
  mimetype: 'video/mp4',
  destination: 'videos/',
  filename: '638d40e7c333bb9d2a767a02e790e80b',
  path: 'videos/638d40e7c333bb9d2a767a02e790e80b',
  size: 10546620
}
</code></pre>