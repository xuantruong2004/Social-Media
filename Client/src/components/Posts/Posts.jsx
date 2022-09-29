import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/postAction";
import { getAllUser } from "../../api/UserRequest";

import Post from "./Post/Post";
import "./Posts.scss";
function Posts({ location }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  if (location === "profilePage") {
    const postProfile = posts.filter((post) => post.userId === user._id);
    posts = postProfile;
  }
  return (
    <div className="Posts">
      {posts.map((post, id) => {
        // console.log(post);
        return <Post key={id} data={post} persons={persons} />;
      })}
    </div>
  );
}

export default Posts;
