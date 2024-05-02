import { connectToDB } from "utils/database";
import Post from "models/posts";

export const POST = async (req, res) => {
    const { userId, caption, imageUrl, VideoUrl } = await req.json();
    try {
        await connectToDB();
        const newPost = new Post({
            userId: userId,
            caption,
            imageUrl,
            VideoUrl
        });

        console.log("New post:", newPost)
        await newPost.save();

        return new Response(JSON.stringify(newPost), {
            status: 201,
        });
    } catch (error) {
        return new Response("Failed to create a new post", { status: 500 });
    }
};