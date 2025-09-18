import Post from "@/app/lib/model/Post";
import connectDb from "@/app/lib/mongodb/mongoose";

export async function GET(req) {
    try {
        await connectDb()
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .limit(3)
            .select("title image");//only fecht need data right so our loading no longer took long time right?
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.log('error in backend recent post while feching', error)
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}