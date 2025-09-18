import Post from "@/app/lib/model/Post";
import connectDb from "@/app/lib/mongodb/mongoose";

export async function GET(req, { params }) {
    const { id } = params;

    try {

        await connectDb();
        const post = await Post.findById(id);

        if (!post) {
            return new Response(JSON.stringify({ error: "Post not found" }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(post), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        return new Response(
            JSON.stringify({
                error: "Internal Server Error",
                details: error.message,
            }),
            { status: 500 }
        );
    }
}

export async function PATCH(req, { params }) {
  try {
    await connectDb();             
    const { id } = params;
    const body = await req.json();   

    const updated = await Post.findByIdAndUpdate(
      id,
      body,                          
      { new: true, runValidators: true }
    );

    if (!updated)
      return new Response(
        JSON.stringify({ message: "Post not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );

   
    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("PATCH error:", err);
    return new Response(
      JSON.stringify({ message: "Server error", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}