import React from "react";
import "./Chat.scss";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequest";
import Conversation from "../../components/Conversation/Conversation";
import { Link, useNavigate } from "react-router-dom";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { useRef } from "react";

function Chat(props) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receiverMessage, setReceiverMessage] = useState(null);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-add-user", user._id);
    socket.current.on("get-users", (users) => {
      console.log(users);
      setOnlineUsers(users);
    });
  }, [user]);

  // send message socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // receiver message socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiverMessage({ ...data });
      console.log("receiver ", receiverMessage);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        console.log({ data });
        setChats(data);
      } catch (error) {
        console.log("Fetch Chats user is fail ", error);
      }
    };
    getChats();
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Chat */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Left Chat</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right chat */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to={"../home"}>
              <img style={{ cursor: "pointer" }} src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <img src={Comment} alt="" onClick={() => navigate("/chat")} />
          </div>
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiverMessage={receiverMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
