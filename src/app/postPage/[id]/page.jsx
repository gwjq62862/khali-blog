"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(
  () => import("@/app/Components/dashboard/TipTapEditor"),
  { ssr: false }
);

const BlogPage = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);

  // Fetch single post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  // Fetch recent posts
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch("/api/posts/recent");
        if (!res.ok) throw new Error("Failed to fetch recent posts");
        const data = await res.json();
        setRecentPosts(data);
      } catch (error) {
        console.log("Error fetching recent posts:", error);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading)
    return <div className="text-center text-gray-300 mt-10">Loading...</div>;

  if (!post)
    return (
      <div className="text-center text-gray-300 mt-10">Post not found</div>
    );

  return (
    <div className="bg-gray-900 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Blog Image */}
        {post.image && (
          <div className="relative w-full h-80 sm:h-96 rounded-lg overflow-hidden mb-6">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />
          </div>
        )}

        {/* Blog Title */}
        <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>

        {/* Blog Content */}
        <div
          className="prose dark:prose-invert max-w-full text-gray-100"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Recent Posts Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white text-center mb-10">
            Recent Posts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.length === 0 && (
              <p className="text-center text-gray-400 col-span-3">
                No recent posts available.
              </p>
            )}

            {recentPosts.map((recent) => (
              <div
                key={recent._id}
                className="group relative rounded-2xl overflow-hidden
                 bg-gray-800 border-2 border-blue-500
                 shadow-md hover:shadow-xl transition duration-300
                 flex flex-col h-full" 
              >
                {/* image */}
                {recent.image && (
                  <div className="relative w-full h-56 sm:h-48">
                    <Image
                      src={recent.image}
                      alt={recent.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-white line-clamp-2">
                    {recent.title}
                  </h3>

                  {/* button pinned to bottom */}
                  <Link
                    href={`/postPage/${recent._id}`}
                    className="mt-auto pt-4"
                  >
                    <button
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700
                             text-white font-medium rounded-lg transition duration-300"
                    >
                      View Project
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
