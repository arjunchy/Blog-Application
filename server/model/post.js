import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
    },
<<<<<<< HEAD
    picture:{
        type: String,
        required: true
    },
=======
    // picture:{
    //     type: String,
    //     required: true
    // },
>>>>>>> ac3876e (removed imageupload)
    username:{
        type: String,
        required: true,
    },
    categories:{
        type: String,
        required: true,
    },
    createDate:{
        type: Date,
        default: new Date()
    }
})

const post = mongoose.model('post', PostSchema);

export default post;