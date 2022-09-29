import React from "react";
import { UilPen } from "@iconscout/react-unicons";
import "./InfoCard.scss";
import { useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as UserApi from "../../api/UserRequest.js";
import { logout } from "../../actions/AuthAction";

function InfoCard(props) {
  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;

  const { user } = useSelector((state) => state.authReducer.authData);
  const [profileUser, setProfileUser] = useState({});

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        console.log(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser.data);
        console.log(profileUser.data);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId && (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => {
                setModalOpened(true);
              }}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        )}
      </div>
      <div className="info">
        <span>
          <b>status:</b>
        </span>
        {profileUser?.relationship && <span>{profileUser.relationship}</span>}
      </div>
      <div className="info">
        <span>
          <b>lives in:</b>
        </span>
        {profileUser?.livesin && <span>{profileUser.livesin}</span>}
      </div>
      <div className="info">
        <span>
          <b>Works:</b>
        </span>
        {profileUser?.worksAt && <span>{profileUser.worksAt}</span>}
      </div>

      <button className="button logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default InfoCard;
