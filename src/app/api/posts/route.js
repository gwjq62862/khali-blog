import Post from '@/app/lib/model/Post';
import User from '@/app/lib/model/mode.user';
import { auth } from '@clerk/nextjs/server';
import connectDb from '@/app/lib/mongodb/mongoose';  
export async function POST(req) {
  try {
    await connectDb();

    const { userId } = await auth();
    if (!userId)
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

 
    const dbUser = await User.findOne({ clerkId: userId });
    if (!dbUser)                      
      return new Response(JSON.stringify({ message: 'User not found in DB' }), { status: 404 });


    const { title, category, image, content } = await req.json();
    const newPost = await Post.create({
      title, category, image, content,
      author: dbUser._id,
    });

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (err) {
    console.error('POST /api/posts error:', err);
    return new Response(JSON.stringify({ message: 'Server error', details: err.message }), { status: 500 });
  }
}