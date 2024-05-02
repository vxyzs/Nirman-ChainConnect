
import mongoose, { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    imageUrl: [{
        type: String,
    }],
    videoUrl: [{
        type: String,
    }],
    createdAt: { type: Date, default: Date.now },
    likedby: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likes: {
        type: Number,
        default: 0,
    },
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        type: String,
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        createdAt: { type: Date, default: Date.now }
    }]
});

const Posts = models.Posts || model("Posts", PostSchema);
export default Posts;