import React from "react";
import "./RightSide.scss";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "./TrendCard/TrendCard";
import { useState } from "react";
import ShareModal from "../ShareModal/ShareModal";
import { Link, useNavigate } from "react-router-dom";
function RightSide(props) {
  const [modalOpened, setModalOpened] = useState(false);
  const navigate = useNavigate();
  const openChats = () => {
    navigate("/chat");
  };
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to={"../home"}>
          <img style={{ cursor: "pointer" }} src={Home} alt="" />
        </Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" onClick={openChats} />
      </div>
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
}

export default RightSide;
