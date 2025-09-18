import Post from "@/app/lib/model/Post";
import connectDb from "@/app/lib/mongodb/mongoose";

export async function DELETE(req,{params}) {
    const {id}=params
  try {
      await connectDb();
        const post = await Post.findById(id);
          if (!post) {
            return new Response(JSON.stringify({ error: "Post not found" }), {
                status: 404,
            });
        }
        await Post.findByIdAndDelete(id);
        return new Response(JSON.stringify(post), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        })
    
  } catch (error) {
    console.log('error in deleting post in backend',error)
    return new Response(JSON.stringify({success:false}))
  }
}