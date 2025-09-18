import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
