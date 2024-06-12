import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import BaskinRobbins31 from "./modal/game/BaskinRobbins31";

let stompClient = null;

const Chat = ({ roomNo, nickname, participantList, master }) => {
  const [publicChats, setPublicChats] = useState([]);
  const [userData, setUserData] = useState({
    sender: nickname,
    connected: false,
    message: "",
    roomNo: roomNo,
  });
  const [date, setDate] = useState("");
  const chatMessagesEndRef = useRef(null);
  const [activeTab, setActiveTab] = useState("chat");

  useEffect(() => {
    if (userData.connected) {
      fetchMessages();
    }
  }, [userData.connected, roomNo]);

  useEffect(() => {
    scrollToBottom();
  }, [publicChats]);

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = () => {
    fetch(`http://localhost:8080/chatroom/public/${roomNo}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPublicChats(data);
        } else {
          setPublicChats([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching public chats:", error);
        setPublicChats([]);
      });
    setDate(getCurrentDate());
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
    stompClient.subscribe(`/topic/${roomNo}`, onMessageReceived);
    userJoin();
    window.addEventListener("beforeunload", userLeave);
  };

  const onError = (err) => {
    console.log("Error: ", err);
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log("Message received: ", payloadData);

    setPublicChats((prevChats) => [...prevChats, payloadData]);
  };

  const userJoin = () => {
    console.log("User joining...");
    var chatMessage = {
      sender: userData.sender,
      type: "JOIN",
      date: new Date().toISOString(), // 추가: ISO 형식으로 날짜 설정
    };
    if (stompClient) {
      stompClient.send(
        `/app/chat.addUser/${roomNo}`,
        {},
        JSON.stringify(chatMessage)
      );
    }
  };

  const userLeave = () => {
    console.log("User leaving...");
    var chatMessage = {
      sender: userData.sender,
      type: "LEAVE",
      date: new Date().toISOString(), // 추가: ISO 형식으로 날짜 설정
    };
    if (stompClient) {
      stompClient.send(
        `/app/chat.leaveUser/${roomNo}`,
        {},
        JSON.stringify(chatMessage)
      );
      stompClient.disconnect(() => {
        console.log("Disconnected");
      });
    }
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient && userData.message.trim() !== "") {
      var chatMessage = {
        sender: userData.sender,
        content: userData.message,
        type: "CHAT",
        date: new Date().toISOString(), // 추가: ISO 형식으로 날짜 설정
      };
      console.log("Sending public message: ", chatMessage);
      stompClient.send(
        `/app/chat.sendMessage/${roomNo}`,
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: "" });
    } else {
      console.error("Cannot send message. No STOMP connection.");
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendValue();
    }
  };

  useEffect(() => {
    connect();
    return () => {
      window.removeEventListener("beforeunload", userLeave);
      userLeave();
    };
  }, []);

  const renderChat = () => (
    <div className="chat-box flex bg-gray-600 rounded-lg flex-col shadow-lg p-4 h-[500px] ">
      <div className="date-banner text-center mb-2">{date}</div>
      <div className="chat-content flex-1 overflow-y-scroll p-1">
        <ul className="chat-messages space-y-2">
          {publicChats.map((chat, index) =>
            chat.type === "JOIN" ? (
              <li key={index} className="text-center text-blue-500 font-semibold">
                {chat.sender}님이 입장하셨습니다.
              </li>
            ) : chat.type === "LEAVE" ? (
              <li key={index} className="text-center text-pink-500 font-semibold">
                {chat.sender}님이 퇴장하셨습니다.
              </li>
            ) : (
              <li
                className={`message flex items-start ${
                  chat.sender === userData.sender ? "justify-end" : ""
                }`}
                key={index}
              >
                {chat.sender !== userData.sender && (
                  <div className="flex flex-col items-start">
                    <div className="avatar bg-blue-500 text-white p-2 rounded">
                      {chat.sender}
                    </div>
                    <span className="text-gray-600 text-sm w-10">
                      {formatDate(chat.date)}
                    </span>
                  </div>
                )}
                <div className="message-data p-2 bg-gray-200 rounded ml-2">
                  {chat.content}
                </div>
                {chat.sender === userData.sender && (
                  <div className="flex flex-col items-end">
                    <div className="avatar self  text-black p-2 rounded">
                      {/* {chat.sender} */}
                    </div>
                    <span className="text-gray-500 text-xs font-thin w-20">
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
          className="send-button bg-yellow-500 text-gray-800 rounded-full px-4 ml-2"
          onClick={sendValue}
        >
          전송
        </button>
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="game-box flex bg-slate-100 flex-col shadow-lg p-10">
      <div className="text-center text-gray-700">Game Screen Placeholder</div>
      <BaskinRobbins31
        nickname={nickname}
        roomNo={roomNo}
        participantList={participantList}
        master={master}
      />
    </div>
  );

  return (
    <div className="container mx-auto p-4 flex flex-col h-[600px]">
      <div className="tabs flex justify-start mb-4 space-x-4">
        <button
          className={`tab px-4 py-2 rounded ${
            activeTab === "chat"
              ? "bg-yellow-500 text-gray-800"
              : "bg-white text-gray-800"
          }`}
          onClick={() => setActiveTab("chat")}
        >
          대화창
        </button>
        <button
          className={`tab px-4 py-2 rounded ${
            activeTab === "game"
              ? "bg-yellow-500 text-gray-800"
              : "bg-white text-gray-800"
          }`}
          onClick={() => setActiveTab("game")}
        >
          게임 화면
        </button>
      </div>
      {!userData.connected ? (
        <div className="loading flex justify-center items-center ">
          <span className="text-gray-500">연결 중...</span>
        </div>
      ) : (
        <div className="content flex-1">
          {activeTab === "chat" ? renderChat() : renderGame()}
        </div>
      )}
    </div>
  );
};

export default Chat;
