import Posts from "models/posts";
import User from "models/Users";
import { connectToDB } from "utils/database";

export const POST = async (request, { params }) => {
    const postId = params.postId;
    const id = params.id;
    try {
        await connectToDB();
        
        const user = await User.findById(id);
        if (!user) return new Response("User not found!", { status: 404 });
        
        const post = await Posts.findById(postId);
        console.log(post);
        if(user.likedPosts){
            const likedPostindex = user.likedPosts?.indexOf(postId);
            if (likedPostindex !== -1) return new Response("Already liked", { status: 400 });
        }

        if (!user.likedPosts) {
            user.likedPosts = [];
        }

        user.likedPosts.push(prompt);
        await user.save();

        return new Response("Liked prompt added", { status: 200 });
    } catch (error) {
        console.log("Error adding the liked prompt :", error);
        return new Response("Server error", { status: 500 });
    }
}

export const DELETE = async (request, { params }) => {
    const id = params.id;
    const postId = params.postId;

    try {
        await connectToDB();

        const user = await User.findById(id);
        if (!user) return new Response("User not found!", { status: 404 });

        const likedPostIndex = user.likedPosts?.indexOf(postId);
        if (likedPostIndex === -1) return new Response("Prompt is not liked!", { status: 400 });

        user.likedPosts.splice(likedPostIndex, 1);

        await user.save();
        return new Response("Prompt Disliked", { status: 200 });
    } catch (error) {
        console.log("Error removing liked prompt: ", error);
        return new Response("Server error", { status: 500 });
    }
}