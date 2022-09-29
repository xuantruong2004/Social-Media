import React from "react";
import FollowerCard from "../FollowerCard/FollowerCard";
import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCart from "../ProfileCart/ProfileCart";
import "./ProfileSide.css";
function ProfileSide(props) {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCart location="homePage" />
      <FollowerCard />
    </div>
  );
}

export default ProfileSide;
