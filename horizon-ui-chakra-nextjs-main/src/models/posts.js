import { Schema, model, models } from "mongoose";

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
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        type: String,
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        createdAt: { type: Date, default: Date.now }
    }]
});

const Posts = models.Posts || model("Posts", PostSchema);
export default Posts;