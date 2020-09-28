import moongoose from 'mongoose'

const commentSchema = new moongoose.Schema({
    text: {
        type: String,
        required: "Text is required"
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    Video: {
        type: moongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
});

const model = moongoose.model("Comment", commentSchema);

export default model;