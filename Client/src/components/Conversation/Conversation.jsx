import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../../api/UserRequest";

function Conversation({ data, currentUserId, online }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((user) => user !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log("Fetch UserId Chat js Fail ", error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profileImage
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profileImage
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpg"
            }
            alt={userData?.username}
            className={online ? "onlineImage" : "offlineImage"}
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span>{online ? "Online" : "offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec " }} />
    </>
  );
}

export default Conversation;
