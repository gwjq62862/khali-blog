"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button, FileInput, Label, Select } from "flowbite-react";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(
  () => import("@/app/Components/dashboard/TipTapEditor"),
  { ssr: false }
);

const CreatePost = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [content, setContent] = useState("");

  if (!isLoaded)
    return <div className="text-center text-xl mt-10">Loading...</div>;
  if (!isSignedIn)
    return (
      <div className="text-center text-3xl font-bold mt-10">Access Denied</div>
    );
  if (!user.publicMetadata?.isAdmin)
    return (
      <div className="text-center text-3xl font-bold mt-10">Access Denied</div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Create New Post
      </h1>
      <form className="flex flex-col gap-6">
        <div>
           <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please add your title" required />
        </div>
        <div>
          <Label htmlFor="file-upload" value="Upload Image" />
          <FileInput id="file-upload" className="mt-2" accept="image/*" />
          <div className="mt-2 w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg border flex items-center justify-center text-gray-500">
            Image Preview
          </div>
        </div>
        <div>
          <Label htmlFor="category" value="Category" />
          <Select id="category" className="mt-2">
            <option value="">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="css">CSS</option>
            <option value="nextjs">Next.js</option>
            <option value="express">Express</option>
            <option value="nodejs">Node.js</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="content" value="Content" />
          <TiptapEditor content={content} setContent={setContent} />
        </div>
        <div className="flex justify-center">
          <Button type="submit" color="blue">
            Create Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
