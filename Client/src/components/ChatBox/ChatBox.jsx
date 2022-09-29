/* eslint-disable no-unreachable */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { getUser } from "../../api/UserRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

import "./ChatBox.scss";
import { useRef } from "react";

function ChatBox({ chat, currentUser, setSendMessage, receiverMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (receiverMessage !== null && receiverMessage.chatId === chat._id) {
      console.log("da nhan duoc", [...messages, receiverMessage]);
      setMessages([...messages, receiverMessage]);
    }
  }, [receiverMessage]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const userId = chat?.members?.find((user) => user !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.log("Fetch UserId BoxChat js Fail ", error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        console.log({ data });
        setMessages(data);
      } catch (error) {
        console.log("Fetch Message Chat_Id is Fail ", error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat, receiverMessage]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      const { data } = await addMessage(message);
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (error) {
      console.log("add new Message is Fail", error);
    }

    // send  message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="Chat-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profileImage
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profileImage
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.jpg"
                    }
                    alt={userData?.username}
                    className="Image"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ width: "100%", border: "0.1px solid #ececec " }} />
            <div className="chat-body">
              {messages.map((message) => (
                <div
                  ref={scroll}
                  key={message?._id}
                  className={
                    message.senderId === currentUser ? "message own" : "message"
                  }
                >
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
            </div>
            <div className="chat-sender">
              <div className="add">+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <button className="button send-button" onClick={handleSend}>
                Send
              </button>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            To on a Chat to Start Conversation
          </span>
        )}
      </div>
    </>
  );
}

export default ChatBox;
