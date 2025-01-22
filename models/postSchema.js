const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    postOwner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    img: {
        type: String,
        default: "",
        required: true,


    },
    caption: {
        type: String,
        default: "",
        maxLength: 250,
        required: true,


    },
    content: {
        type: String,
        default: "",
        maxLength: 1000,
        required: true,



    },
    video: {
        type: String,
        default: "",

    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    },],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
},
    { timestamps: true });
module.exports = mongoose.model("Post", postSchema);