import axios from "axios";
import { request, response } from "express";
import routes from "../../route";
const addCommentForm = document.getElementById("jsAddComment");

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment: comment,
      user: request.user,
    },
  });
};

const handlesubmit = async (event) => {
  event.preventDefault(); // 새로고침 방지
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  await sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handlesubmit);
}

if (addCommentForm) {
  init();
}
