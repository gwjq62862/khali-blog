"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const OurPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
const params=useParams()
  // Fetch user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts"); // Your API endpoint for user's posts
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

 
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/deletePost/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete post");

      // Remove from state
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  if (loading)
    return <div className="text-center text-gray-300 mt-10">Loading...</div>;

  return (
    <div className="bg-gray-900 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          Our Posts
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-400">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="group relative rounded-2xl overflow-hidden 
                           bg-gray-800 border-2 border-blue-500 
                           shadow-md hover:shadow-xl transition duration-300 flex flex-col"
              >
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

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-white line-clamp-2">
                    {post.title}
                  </h3>

                  <div className="mt-4 flex justify-between gap-2">
                    <Link href={`/postPage/${post._id}`}>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                        View
                      </button>
                    </Link>

                    <Link href={`/dashboard/ourpost/editPost/${post._id}`}>
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(post._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurPosts;
