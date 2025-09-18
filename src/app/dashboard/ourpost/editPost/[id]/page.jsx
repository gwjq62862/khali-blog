"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, FileInput, Label, Select } from "flowbite-react";
import TiptapEditor from "@/app/Components/dashboard/TipTapEditor";
import { uploadImage } from "@/app/lib/imgUpload/ImgUpload";
import { useUser } from "@clerk/nextjs";
const EditPost = () => {
  const { id } = useParams();
  const{user}=useUser()
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const[catagory,setCatagory]=useState("")
  useEffect(() => {
    const fecthData = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const datafetch = await res.json();
      setData(datafetch);
      setContent(datafetch.content || "");
      setTitle(datafetch.title || "");
      setCatagory(datafetch.category)
      setPreviewUrl(datafetch.image || "");
    };
    fecthData();
  }, [id]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!selectedFile) {
        alert("Please select an image to upload.");
        return;
      }
  
      setUploading(true);
  
      try {
        const imageUrl = await uploadImage(selectedFile);
        if (!imageUrl) throw new Error("Failed to upload image");
  
        const formData = {
          title: e.target.title.value,
          category: e.target.category.value,
          content, 
          image: imageUrl,
          author: user.id, 
        };
  
        const res = await fetch(`/api/posts/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
  
        if (!res.ok) throw new Error(data.message || "Failed to create post");
  
        console.log("Post edited successfully:", data);
        alert("Post edited successfully!");
  
        e.target.reset();
        setSelectedFile(null);
        setPreviewUrl("");
        setContent("");
      } catch (error) {
        console.error("Error edtiting post:", error);
        alert("There was an error editing the post. Please try again.");
      } finally {
        setUploading(false);
      }
    };
  
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Create New Post
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please add your title"
            required
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="file-upload" value="Upload Image" />
          <FileInput
            id="file-upload"
            className="mt-2"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedFile(file);

                setPreviewUrl(URL.createObjectURL(file));
              }
            }}
          />
          <div
            className={`mt-2 w-full  h-auto bg-gray-200 dark:bg-gray-700 rounded-lg border flex items-center justify-center overflow-hidden`}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className={`w-full h-full  object-cover`}
              />
            ) : (
              <span className="text-gray-500">Image Preview</span>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="category" value="Category" />
          <Select id="category" className="mt-2" value={catagory} onChange={(e)=>setCatagory(e.target.value)}>
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
          <TiptapEditor
            key={content}
            content={content}
            setContent={setContent}
          />
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

export default EditPost;
