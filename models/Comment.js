import moongoose from "mongoose";
import { date } from "./Date";
const commentSchema = new moongoose.Schema({
  author: String,
  author__profile: String,
  text: {
    type: String,
    required: "Text is required",
  },
  createAt: {
    type: String,
    default: date(),
  },
  Video: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  creator: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = moongoose.model("Comment", commentSchema);

export default model;
