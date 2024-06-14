import { Stomp } from "@stomp/stompjs";
import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { API_SERVER_HOST } from "../../../../api/axios_intercepter";

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
      const socket = new SockJS(`${API_SERVER_HOST}/game`);
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
      stompClient.send(`/app/start/${roomNo}`, {}, JSON.stringify(gameMessage));
    }
  };

  const handleNumberClick = (number) => {
    setMove(number);
  };

  return (
    <div className="game-container p-4">
      <h1 className="text-2xl font-bold mb-4">배스킨 라빈스 31</h1>
      {gameState.losingPlayer && (
        <div className="mt-4">
          <h2 className="text-xl text-red-500 font-bold">
             {gameState.losingPlayer}(이)가 졌어!
          </h2>
        </div>
      )}
      <div className="mb-4">
        {currentRange.map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            className="m-2 p-2 bg-blue-500 text-white rounded"
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={sendMove}
        className="mb-4 p-2 bg-green-500 text-white rounded"
      >
        다음 차례로
      </button>
      {nickname === master && (
        <>
          <button
            onClick={startGame}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            게임 시작
          </button>
          <button
            onClick={resetGame}
            className="mb-4 p-2 bg-red-500 text-white rounded"
          >
            재시작
          </button>
        </>
      )}
      <div>
        <ul className="list-disc list-inside">
          순서: {gameState.currentTurn}
        </ul>
        <ul className="list-disc list-inside">
          게임 참가자: {gameState.players.join(", ")}
        </ul>
        <div>
          <h2 className="text-xl font-bold mb-2">게임 현황</h2>
          <ul className="list-disc list-inside">
            {gameState.moves.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BaskinRobbins31;
