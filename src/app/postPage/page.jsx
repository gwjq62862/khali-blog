"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return <div className="text-center text-gray-300 mt-10">Loading...</div>;

  return (
    <div className="bg-gray-900 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          Latest Posts
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 && (
            <p className="text-center text-gray-400">No posts yet.</p>
          )}
          {posts.map((post) => (
            <div
              key={post._id}
              className="group relative rounded-2xl overflow-hidden
                 bg-gray-800 border-2 border-blue-500
                 shadow-md hover:shadow-xl transition duration-300
                 flex flex-col h-full" /* 1. same height */
            >
              {/* image */}
              {post.image && (
                <div className="relative w-full h-56 sm:h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* text + button */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-white line-clamp-2">
                  {post.title}
                </h2>

                {/* button always at bottom */}
                <Link href={`/postPage/${post._id}`} className="mt-auto pt-4">
                  {" "}
                  {/* 2. push to bottom */}
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
  );
};

export default PostPage;
