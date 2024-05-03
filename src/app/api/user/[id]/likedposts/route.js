import User from "models/Users";
import { connectToDB } from "utils/database";

export const GET = async (request, { params }) => {
    const id = params.id;
    try {
        await connectToDB();

        const user = await User.findById(id).populate({
            path: 'likedPosts',
            populate: { path: 'userId' } 
        });
        if (!user) return new Response("User not found!", { status: 404 });

        const likedPosts = user.likedPosts;

        return new Response(JSON.stringify(likedPosts), { status: 200 });
    } catch (error) {
        console.log("Error fetching liked prompts: ", error);
        return new Response("Server error", { status: 500 });
    }
}