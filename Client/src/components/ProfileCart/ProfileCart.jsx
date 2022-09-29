import React from "react";
import "./ProfileCart.css";
import Cover from "../../img/cover.jpg";
import ProfileImg from "../../img/profileImg.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfileCart(props) {
  const { location } = props;
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { posts } = useSelector((state) => state.postReducer);

  return (
    <div className="ProfileCart">
      <div className="ProfileImage">
        <img
          src={
            user.coverImage
              ? serverPublic + user.coverImage
              : serverPublic + "defaultCover.jpg"
          }
          style={location === "homePage" ? { height: "6rem" } : {}}
          alt=""
        />
        <img
          src={
            user.profileImage
              ? serverPublic + user.profileImage
              : serverPublic + "defaultProfile.jpg"
          }
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span className="name">
          {user.firstname} {user.lastname}
        </span>
        <span className="job">
          {" "}
          {user.worksAt ? user.worksAt : "write about yourself"}
        </span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followings.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>follower</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "var(--orange)" }}
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
}

export default ProfileCart;
