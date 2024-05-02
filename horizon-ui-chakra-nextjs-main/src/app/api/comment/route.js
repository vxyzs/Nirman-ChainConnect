import { NextResponse } from "next/server";
import Posts from "models/posts";
import { connectToDB } from "utils/database";

export async function POST(request) {
    await connectToDB();
    try {
        const { postId, userId, content } = await request.json();

        if (!postId || !userId || !content) {
            return NextResponse.json(
                { message: "Post ID, User ID are required" },
                { status: 400 }
            );
        }

        const post = await Posts.findById(postId);

        if (!post) {
            return NextResponse.json(
                { message: "Post not found" },
                { status: 404 }
            );
        }
        const newComment = {
            userId, content, createdAt: new Date()
        };

        post.comments.push(newComment);

        await post.save();

        return NextResponse.json({ message: "Comment added", comment: newComment }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        )
    }
}