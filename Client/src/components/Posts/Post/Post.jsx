import React from "react";
import Comment from "../../../img/comment.png";
import Share from "../../../img/share.png";
import Heart from "../../../img/like.png";
import NotLike from "../../../img/notlike.png";
import "./Post.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { likePost } from "../../../api/PostRequest";
import moment from "moment/moment";

function Post({ data, persons }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.like.includes(user._id));
  const [like, setLike] = useState(data.like.length);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked(!liked);
    liked ? setLike((prev) => prev - 1) : setLike((prev) => prev + 1);
  };

  const userId = persons.find((person) => person._id === data.userId);
  return (
    <div className="Post">
      <div className="userPost">
        <img
          src={
            userId?.profileImage
              ? serverPublic + userId.profileImage
              : serverPublic + "defaultProfile.jpg"
          }
          alt={userId?.firstname}
        />
        <span>
          {userId?.firstname} {userId?.lastname}
        </span>
      </div>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt={data?.name}
      />
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {moment(data.createdAt).format("HH:mm:ss")} -{" "}
        {moment(data.createdAt).format("DD/MM/YYYY")}
      </span>
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt="Heart"
          onClick={handleLike}
          style={{ cursor: "pointer" }}
        />
        <img src={Comment} alt="Comment" />
        <img src={Share} alt="Share" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {like} likes
      </span>
      <div className="detail">
        <span>
          <b>{data?.name}</b>
        </span>
        <span>{data?.desc}</span>
      </div>
    </div>
  );
}

export default Post;
