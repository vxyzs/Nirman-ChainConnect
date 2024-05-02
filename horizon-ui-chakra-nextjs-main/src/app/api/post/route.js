import { connectDB } from "utils/database";
import Posts from "models/posts";

export const GET = async (request) => {
    try {
        await connectDB();
        const posts = await Posts.find({}).sort({ createdAt: -1 });

        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all posts", { status: 500 });
    }
};
