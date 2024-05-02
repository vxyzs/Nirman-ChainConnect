import User from "models/Users";
import { connectToDB } from "utils/database";

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        console.log(params?.id);
        const user = await User.findById(params.id);
        if (!user) {
            return new Response('User not found', { status: 404 });
        }
        console.log(user);
        return new Response(JSON.stringify(user), { status: 200 });

    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response('Failed to fetch user', { status: 500 });
    }
}
