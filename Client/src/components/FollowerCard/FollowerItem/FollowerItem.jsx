import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../../actions/userAction";
import "./FollowerItem.css";
function FollowerItem({ person }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  let username = person?.username;
  username = username.split("@")[0];

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);
  };

  return (
    <div className="FollowerItem">
      <img
        src={
          person.profileImage
            ? serverPublic + person.profileImage
            : serverPublic + "defaultProfile.jpg"
        }
        alt={person?.firstname}
      />
      <div className="info">
        <p className="fullName">
          {person?.firstname} {person?.lastname}
        </p>
        <p className="nickname">@{username}</p>
      </div>
      <button
        className={`button fc-btn ${following ? "unFollow" : "follow"}`}
        onClick={handleFollow}
      >
        {following ? "unFollow" : "follow"}
      </button>
    </div>
  );
}

export default FollowerItem;
