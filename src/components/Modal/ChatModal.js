import Draggable from "react-draggable";
import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
let stompClient = null;

const ChatModal = ({ friend, closeModal }) => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [userData, setUserData] = useState({
    username: "user",
    connected: false,
    message: "",
    receiverName: friend,
  });
  const chatMessagesEndRef = useRef(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [privateChats]);

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log("Connected to WebSocket");
    setUserData((prevState) => ({
      ...prevState,
      connected: true,
    }));
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    fetchChatHistory();
  };

  const onError = (err) => {
    console.log("Error: ", err);
  };

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.sender)) {
      privateChats.get(payloadData.sender).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.sender, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const fetchChatHistory = () => {
    fetch(`http://localhost:8080/messages/private/${userData.username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const chatMap = new Map();
          data.forEach((chat) => {
            if (chatMap.has(chat.sendername)) {
              chatMap.get(chat.sendername).push(chat);
            } else {
              chatMap.set(chat.sendername, [chat]);
            }
          });
          setPrivateChats(chatMap);
        } else {
          setPrivateChats(new Map());
        }
      })
      .catch((error) => {
        console.error("Error fetching private chats:", error);
        setPrivateChats(new Map());
      });
    setDate(getCurrentDate());
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient && userData.message.trim() !== "") {
      if (!userData.receiverName || userData.receiverName.trim() === "") {
        console.error("Receiver name must not be null or empty");
        return;
      }

      var chatMessage = {
        sendername: userData.username,
        receivername: userData.receiverName,
        message: userData.message,
        status: "MESSAGE",
        date: new Date().toISOString(),
      };
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    } else {
      console.error("Cannot send message. No STOMP connection.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendValue();
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(today.getDate()).padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleTimeString();
  };

  return (
    <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center">
      <Draggable>
        <div className="bg-white p-6 rounded shadow-lg w-1/2 relative">
          <button
            className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={closeModal}
          >
            X
          </button>
          <h2 className="text-2xl mb-4">Chat with {friend}</h2>
          <div className="container mx-auto p-4 flex flex-col ">
            {userData.connected ? (
              <div className="chat-box flex bg-slate-100 flex-col shadow-lg h-2/5 p-10">
                <div className="chat-content flex-1 overflow-y-scroll p-2">
                  <ul className="chat-messages">
                    {[...privateChats.values()].flat().map((chat, index) =>
                      chat.status === "JOIN" ? (
                        <li
                          key={index}
                          className="text-center text-blue-600 font-bold"
                        >
                          {chat.sendername}님이 입장하셨습니다.
                        </li>
                      ) : chat.status === "LEAVE" ? (
                        <li
                          key={index}
                          className="text-center text-pink-500 font-bold"
                        >
                          {chat.sendername}님이 퇴장하셨습니다.
                        </li>
                      ) : (
                        <li
                          className={`message flex items-start ${
                            chat.sendername === userData.username
                              ? "justify-end"
                              : ""
                          }`}
                          key={index}
                        >
                          {chat.sendername !== userData.username && (
                            <div className="flex flex-col items-start">
                              <div className="avatar bg-blue-500 text-white p-2 rounded">
                                {chat.sendername}
                              </div>
                              <span className="text-gray-500 text-sm w-10">
                                {formatDate(chat.date)}
                              </span>
                            </div>
                          )}
                          <div className="message-data p-2 bg-gray-200 rounded ml-2">
                            {chat.message}
                          </div>
                          {chat.sendername === userData.username && (
                            <div className="flex flex-col items-end">
                              <div className="avatar self bg-green-500 text-black p-2 rounded">
                                {chat.sendername}
                              </div>
                              <span className="text-gray-500 text-sm w-20">
                                {formatDate(chat.date)}
                              </span>
                            </div>
                          )}
                        </li>
                      )
                    )}
                    <div ref={chatMessagesEndRef} />
                  </ul>
                </div>
                <div className="send-message flex mt-4">
                  <input
                    type="text"
                    className="input-message flex-1 rounded-full bg-slate-200 px-4 py-2"
                    placeholder="메시지를 입력하세요"
                    value={userData.message}
                    onChange={handleMessage}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    type="button"
                    className="send-button bg-green-500 text-white rounded-full px-4 ml-2"
                    onClick={sendValue}
                  >
                    전송
                  </button>
                </div>
              </div>
            ) : (
              <div className="loading flex justify-center items-center h-full">
                <span className="text-gray-500">연결 중...</span>
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default ChatModal;
