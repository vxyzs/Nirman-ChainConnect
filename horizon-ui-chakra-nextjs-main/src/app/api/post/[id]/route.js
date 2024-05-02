import { connectToDB } from "utils/database";
import Posts from "models/posts";

export const GET = async (request) => {
    try {
        const postId = request.params.postId;
        await connectToDB();
        const post = await Posts.findById(postId).populate('userId');

        if (!post) {
            return new Response("Post not found", { status: 404 });
        }

        return new Response(JSON.stringify(post), { status: 200 });
    } catch (error) {

        console.error("Failed to fetch post:", error);
        return new Response("Failed to fetch the post", { status: 500 });
    }
};
