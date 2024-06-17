import { Stomp } from "@stomp/stompjs";
import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { WEB_SOCKET_SERVER } from "../../../api/websocketApi";

let stompClient = null;

const BaskinRobbins31 = ({
  nickname,
  roomNo,
  participantList = [],
  master,
}) => {
  const [move, setMove] = useState(null);
  const [currentTurn, setCurrentTurn] = useState("");

  const [gameState, setGameState] = useState({
    moves: [],
    losingPlayer: "",
    currentTurn: master,
    players: participantList.map((player) => player.nickname),
  });
  const [currentRange, setCurrentRange] = useState([1, 2, 3]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS(`${WEB_SOCKET_SERVER}`);
      stompClient = Stomp.over(socket);
      stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
      console.log("Connected to WebSocket");
      setConnected(true);
      stompClient.subscribe(`/topic/game/${roomNo}`, onMessageReceived);
    };

    const onError = (error) => {
      console.error("WebSocket connection error: ", error);
    };

    const onMessageReceived = (message) => {
      const gameMessage = JSON.parse(message.body);
      console.log("Message received: ", gameMessage);

      setGameState((prevState) => ({
        ...prevState,
        moves: gameMessage.moves,
        losingPlayer: gameMessage.losingPlayer,
        currentTurn: gameMessage.currentTurn,
        players: gameMessage.players,
      }));

      if (gameMessage.losingPlayer) {
        setCurrentRange([1, 2, 3]);
        return;
      }

      if (gameMessage.moves.length > 0) {
        const lastMove = gameMessage.moves[gameMessage.moves.length - 1];
        const lastNumbers = lastMove.match(/\d+/g);
        const lastNumber = parseInt(lastNumbers[lastNumbers.length - 1], 10);
        const nextNumber = lastNumber + 1;
        setCurrentRange([nextNumber, nextNumber + 1, nextNumber + 2]);
      } else {
        setCurrentRange([1, 2, 3]);
      }

      setCurrentTurn(gameMessage.currentTurn);
    };

    if (gameState.players.length > 0) {
      connect();
    }
  }, [nickname, roomNo, participantList, gameState.players]);

  const sendMove = () => {
    if (
      connected &&
      nickname &&
      move !== null &&
      nickname === gameState.currentTurn
    ) {
      console.log("Sending move:", move);
      const startNumber = currentRange[0];
      const numbers = [];
      for (let i = startNumber; i <= move; i++) {
        numbers.push(i);
      }
      const gameMessage = { player: nickname, numbers };
      stompClient.send(`/app/move/${roomNo}`, {}, JSON.stringify(gameMessage));
      setMove(null);
    } else {
      console.log("Cannot send move. Conditions not met.");
      console.log("Connected:", connected);
      console.log("Nickname:", nickname);
      console.log("Move:", move);
      console.log("Current Turn:", gameState.currentTurn);
    }
  };

  const resetGame = () => {
    if (connected) {
      stompClient.send(`/app/reset/${roomNo}`, {}, JSON.stringify({}));
      setCurrentRange([1, 2, 3]);
      setCurrentTurn(gameState.players[0]);
    }
  };

  const startGame = () => {
    if (connected && nickname === master) {
      const playerNames = participantList.map((player) => player.nickname);
      const gameMessage = { players: playerNames };
      stompClient.send(
        `/app/startBaskinRobbins31/${roomNo}`,
        {},
        JSON.stringify(gameMessage)
      );
    }
  };

  const handleNumberClick = (number) => {
    setMove(number);
  };

  const getButtonClass = (number) => {
    return number >= 31
      ? "ml-2 p-1.5 bg-red-500 text-white rounded"
      : "ml-2 p-1.5 bg-blue-500 text-white rounded";
  };

  return (
    <div className="game-container">
      <h1 className="text-2xl font-bold mb-4 text-center">배스킨 라빈스 31</h1>
      {gameState.losingPlayer && (
        <div className="mt-4">
          <h2 className="text-xl text-red-500 font-bold">
            {gameState.losingPlayer}(이)가 졌어!
          </h2>
        </div>
      )}
      <div className="mb-4 relative">
        {currentRange.map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            className={`m-3 p-2 bg-blue-500 text-white rounded ${getButtonClass(
              number
            )}`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={sendMove}
          className="m-3 p-2 bg-green-500 text-white rounded absolute right-0"
        >
          제출
        </button>
      </div>

      <div className="">
        <ul className="list-disc list-inside">순서: {gameState.currentTurn}</ul>
        <ul className="list-disc list-inside">
          게임 참가자: {gameState.players.join(", ")}
        </ul>
        <div>
          <h2 className="text-xl font-bold mb-2">게임 현황</h2>
          <ul className="h-48 overflow-y-auto">
            {gameState.moves
              .slice()
              .reverse()
              .map((msg, index) => {
                const playerName = msg.split(": ")[0];
                const numbers = JSON.parse(msg.split(": ")[1]);
                return (
                  <li key={index} className="mb-2 list-none">
                    <span className="font-bold">{playerName}</span>
                    {numbers.map((number, i) => (
                      <button key={i} className={getButtonClass(number)}>
                        {number}
                      </button>
                    ))}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      {nickname === master && (
        <div className="content-center justify-items-center">
          <button
            onClick={startGame}
            className="mt-10 p-2 mr-36 bg-blue-500 text-white rounded"
          >
            게임 시작
          </button>
          <button
            onClick={resetGame}
            className="mb-4 p-2 bg-red-500 text-white rounded"
          >
            재시작
          </button>
        </div>
      )}
    </div>
  );
};

export default BaskinRobbins31;
