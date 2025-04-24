import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: String,
        required: true
    },
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment;