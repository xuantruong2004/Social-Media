import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: { type: String, require: true },
    like: [],
    image: String,
    desc: String,
  },
  {
    timestamps: true,
  }
);
const PostModel = mongoose.model("Posts", PostSchema);
export default PostModel;
