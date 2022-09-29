import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCart from "../../components/ProfileCart/ProfileCart";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.scss";
function Profile(props) {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-center">
        <ProfileCart location="profilePage" />
        <PostSide location="profilePage" />
      </div>
      <RightSide />
    </div>
  );
}

export default Profile;
