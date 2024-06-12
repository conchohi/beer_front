import { Stomp } from "@stomp/stompjs";
import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";

let stompClient = null;

const BaskinRobbins31 = ({ nickname, roomNo, participantList, master }) => {
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
      const socket = new SockJS("http://localhost:8080/game");
      stompClient = Stomp.over(socket);
      stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
      console.log("Connected to WebSocket");
      setConnected(true);
      stompClient.subscribe(`/topic/game/${roomNo}`, onMessageReceived);
      stompClient.send(`/app/game/join/${roomNo}`, {}, JSON.stringify({}));
    };

    const onError = (error) => {
      console.error("WebSocket connection error: ", error);
    };

    const onMessageReceived = (message) => {
      const gameMessage = JSON.parse(message.body);
      setGameState(gameMessage);

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
  }, [nickname, roomNo, gameState.players]);

  const sendMove = () => {
    if (connected && nickname && move !== null && nickname === currentTurn) {
      const startNumber = currentRange[0];
      const numbers = [];
      for (let i = startNumber; i <= move; i++) {
        numbers.push(i);
      }
      const gameMessage = { player: nickname, numbers };
      stompClient.send(
        `/app/game/move/${roomNo}`,
        {},
        JSON.stringify(gameMessage)
      );
      const lastNumber = move;
      setCurrentRange([lastNumber + 1, lastNumber + 2, lastNumber + 3]);
      setMove(null);
    }
  };

  const resetGame = () => {
    if (connected) {
      stompClient.send(`/app/game/reset/${roomNo}`, {}, JSON.stringify({}));
      setCurrentRange([1, 2, 3]);
      setCurrentTurn(gameState.players[0]);
    }
  };

  const startGame = () => {
    if (connected && nickname === master) {
      const playerNames = participantList.map((player) => player.nickname);
      stompClient.send(
        `/app/game/start/${roomNo}`,
        {},
        JSON.stringify({ players: playerNames }) // 이 구조가 예상 형식과 일치하는지 확인
      );
    }
  };

  const handleNumberClick = (number) => {
    setMove(number);
  };

  return (
    <div className="game-container p-4">
      <h1 className="text-2xl font-bold mb-4">Baskin Robbins 31</h1>
      {gameState.losingPlayer && (
        <div className="mt-4">
          <h2 className="text-xl text-red-500 font-bold">
            {gameState.losingPlayer} has lost the game!
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
        disabled={move === null || nickname !== currentTurn}
      >
        Send Move
      </button>
      {nickname === master && (
        <button
          onClick={startGame}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Start Game
        </button>
      )}
      {nickname === master && (
        <button
          onClick={resetGame}
          className="mb-4 p-2 bg-red-500 text-white rounded"
        >
          Reset Game
        </button>
      )}
      <div>
        <ul className="list-disc list-inside">Turn Player: {players[i]}</ul>
        <ul className="list-disc list-inside">
          All Players: {gameState.players.join(", ")}
        </ul>
        <div>
          <h2 className="text-xl font-bold mb-2">Game State</h2>
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
