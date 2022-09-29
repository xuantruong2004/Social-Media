import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";
function Home(props) {
  return (
    <div className="Home">
      <ProfileSide />
      <PostSide location="homePage" />
      <RightSide />
    </div>
  );
}

export default Home;
