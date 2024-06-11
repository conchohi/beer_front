import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

let stompClient = null;

const Game = ({ roomNo, username }) => {
  const [players, setPlayers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [userData, setUserData] = useState({
    username: username,
    connected: false,
    message: "",
    roomNo: roomNo,
  });
  const [turn, setTurn] = useState(false);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

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
    stompClient.subscribe(`/topic/game/${roomNo}`, onMessageReceived);
    joinGame();
  };

  const onError = (err) => {
    console.log("Error: ", err);
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log("Message received: ", payloadData);

    if (payloadData.type === "JOIN" || payloadData.type === "LEAVE") {
      setPlayers(payloadData.players);
    } else if (payloadData.type === "TURN") {
      setCurrentPlayer(payloadData.currentPlayer);
      setCurrentNumber(payloadData.currentNumber);
      if (payloadData.currentPlayer === username) {
        setTurn(true);
      } else {
        setTurn(false);
      }
    }
  };

  const joinGame = () => {
    var gameMessage = {
      roomNo: roomNo,
      senderName: userData.username,
      type: "JOIN",
    };
    if (stompClient) {
      stompClient.send("/app/game.join", {}, JSON.stringify(gameMessage));
    }
  };

  const leaveGame = () => {
    var gameMessage = {
      roomNo: roomNo,
      senderName: userData.username,
      type: "LEAVE",
    };
    if (stompClient) {
      stompClient.send("/app/game.leave", {}, JSON.stringify(gameMessage));
      stompClient.disconnect(() => {
        console.log("Disconnected");
      });
    }
  };

  const playTurn = (count) => {
    if (stompClient && turn) {
      var gameMessage = {
        roomNo: roomNo,
        senderName: userData.username,
        type: "TURN",
        count: count,
      };
      stompClient.send("/app/game.play", {}, JSON.stringify(gameMessage));
      setTurn(false);
    }
  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("Disconnected");
      });
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col h-[600px] bg-black text-white">
      {!userData.connected ? (
        <div className="loading flex justify-center items-center ">
          <span className="text-gray-500">연결 중...</span>
        </div>
      ) : (
        <div className="game-box flex flex-col shadow-lg p-10">
          <div className="players-list mb-4">
            <h2 className="text-lg font-bold">참여자:</h2>
            <ul>
              {players.map((player, index) => (
                <li key={index} className="text-base">
                  {player}
                </li>
              ))}
            </ul>
          </div>
          <div className="current-number mb-4 text-center">
            <h2 className="text-2xl font-bold">현재 숫자: {currentNumber}</h2>
          </div>
          <div className="current-player mb-4 text-center">
            <h2 className="text-xl font-bold">
              현재 플레이어: {currentPlayer}
            </h2>
          </div>
          {turn && (
            <div className="play-turn flex justify-center space-x-4">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  className="btn bg-purple-600 text-white px-4 py-2 rounded"
                  onClick={() => playTurn(num)}
                >
                  {num} 숫자 외치기
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
