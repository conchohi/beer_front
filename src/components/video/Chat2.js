import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import ChatBox from "./test/ChatBox";
import GameBox from "./test/GameBox";
import GameSelectModal2 from "./test/game/GameSelectModal2";
import { API_SERVER_HOST } from "../../api/axios_intercepter";
const Chat2 = ({ roomNo, nickname, participantList = [], master }) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [isConnected, setIsConnected] = useState(false);
  const [isGameSelectModalOpen, setIsGameSelectModalOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const stompClientRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const username = nickname;

  useEffect(() => {
    const socket = new SockJS(`${API_SERVER_HOST}/ws`);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect(
      {},
      (frame) => {
        console.log("Connected: " + frame);
        setIsConnected(true);
        stompClient.subscribe(`/topic/${roomNo}`, (message) => {
          if (message.body) {
            let body = JSON.parse(message.body)
            if(body.type === "GAME"){
              setCurrentGame(body.content);
              console.log(body.content)
            }
            setMessages((prevMessages) => [
              ...prevMessages,
              JSON.parse(message.body),
            ]);
          }
        });

        // 새로운 사용자가 입장했음을 알리는 메시지 전송
        stompClient.send(
          `/app/chat.addUser/${roomNo}`,
          {},
          JSON.stringify({ sender: username, type: "JOIN" })
        );
      },
      (error) => {
        console.error("Connection error: ", error);
      }
    );

    return () => {
      if (stompClientRef.current) {
        // 퇴장 메시지 전송
        stompClientRef.current.send(
          `/app/chat.leaveUser/${roomNo}`,
          {},
          JSON.stringify({ sender: username, type: "LEAVE" })
        );
        stompClientRef.current.disconnect();
      }
    };
  }, [roomNo, username]);

  const handleSendMessage = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      const chatMessage = {
        sender: username,
        content: newMessage,
        type: "CHAT",
      };
      stompClientRef.current.send(
        `/app/chat.sendMessage/${roomNo}`,
        {},
        JSON.stringify(chatMessage)
      );
      setNewMessage("");
    } else {
      console.error("STOMP client is not connected");
    }
  };

  const openGameSelectModal = () => {
    setIsGameSelectModalOpen(true);
  };

  const closeGameSelectModal = () => {
    setIsGameSelectModalOpen(false);
  };

  const handleGameSelect = (game) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      const chatMessage = {
        sender: username,
        content: game,
        type: "GAME",
      };
      stompClientRef.current.send(
        `/app/chat.sendMessage/${roomNo}`,
        {},
        JSON.stringify(chatMessage)
      );
      setNewMessage("");
    } else {
      console.error("STOMP client is not connected");
    }
    closeGameSelectModal();
  };

  return (
    <div className="container mx-auto p-4 flex flex-col h-full max-h-[800px]">
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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={openGameSelectModal}
        >
          게임 선택
        </button>
      </div>
      {!isConnected ? (
        <div className="loading flex justify-center items-center">
          <span className="text-gray-500">연결 중...</span>
        </div>
      ) : (
        <div className="content flex-1">
          {activeTab === "chat" ? (
            <ChatBox
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          ) : (
            <GameBox
              currentGame={currentGame}
              nickname={nickname}
              roomNo={roomNo}
              participantList={participantList}
            />
          )}
        </div>
      )}
      {isGameSelectModalOpen && (
        <GameSelectModal2 close={closeGameSelectModal} handleGameSelect={handleGameSelect} />
      )}
    </div>
  );
};

export default Chat2;
