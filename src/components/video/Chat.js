import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import BaskinRobbins31 from "./modal/game/BaskinRobbins31";
// import GameA from "./modal/game/GameA"; // GameA 컴포넌트를 import
// import GameB from "./modal/game/GameB"; // GameB 컴포넌트를 import
// import GameC from "./modal/game/GameC"; // GameC 컴포넌트를 import

const Chat = ({ roomNo, nickname, participantList, master }) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [currentGame, setCurrentGame] = useState("BaskinRobbins31");
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const username = nickname; // 닉네임 고정

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect(
      {},
      (frame) => {
        console.log("Connected: " + frame);
        setIsConnected(true);
        stompClient.subscribe(`/topic/${roomNo}`, (message) => {
          if (message.body) {
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

  const enter = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const renderChat = () => (
    <div className="chat-box flex bg-white rounded-lg flex-col shadow-lg p-4 h-full">
      <div className="chat-content flex-1 overflow-y-scroll p-1">
        <ul className="chat-messages space-y-2">
          {messages.map((message, index) => (
            <li key={index}>
              {message.type === "JOIN" ? (
                <span className="text-pink-500 font-bold">
                  {message.sender}님이 입장하셨습니다.
                </span>
              ) : message.type === "LEAVE" ? (
                <span className="text-pink-500 font-bold">
                  {message.sender}님이 퇴장하셨습니다.
                </span>
              ) : (
                <>
                  <span className="text-pink-500 font-bold">
                    {message.sender}
                  </span>
                  : {message.content}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="send-message flex mt-4">
        <input
          type="text"
          className="input-message flex-1 rounded-full bg-slate-200 px-4 py-2"
          placeholder="메시지를 입력하세요"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={enter}
        />
        <button
          type="button"
          className="send-button bg-yellow-500 text-gray-800 rounded-full px-4 ml-2"
          onClick={handleSendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );

  const renderGame = () => {
    const games = {
      BaskinRobbins31: BaskinRobbins31,
      // GameA: GameA,
      // GameB: GameB,
      // GameC: GameC,
    };

    const GameComponent = games[currentGame];

    return (
      <div className="game-box flex bg-slate-100 flex-col shadow-lg p-10">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentGame("BaskinRobbins31")}
          >
            BaskinRobbins31
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentGame("GameA")}
          >
            Game A
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentGame("GameB")}
          >
            Game B
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentGame("GameC")}
          >
            Game C
          </button>
        </div>
        {GameComponent && (
          <GameComponent
            nickname={nickname}
            roomNo={roomNo}
            participantList={participantList}
            master={master}
          />
        )}
      </div>
    );
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
      </div>
      {!isConnected ? (
        <div className="loading flex justify-center items-center">
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
