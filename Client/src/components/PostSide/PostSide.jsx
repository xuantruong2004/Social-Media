import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import cx from "./PostSide.module.scss";
function PostSide({ location }) {
  return (
    <div className={cx.PostSide}>
      <PostShare />
      <Posts location={location} />
    </div>
  );
}

export default PostSide;
