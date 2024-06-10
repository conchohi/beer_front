import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

let stompClient = null;

const Game31 = ({ username }) => {
  const [move, setMove] = useState([]);
  const [gameState, setGameState] = useState({
    moves: [],
    players: [],
    currentTurn: "",
    losingPlayer: "",
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
      stompClient.subscribe("/topic/game", onMessageReceived);

      // Join the game with the username
      const joinMessage = { player: username };
      stompClient.send("/app/join", {}, JSON.stringify(joinMessage));
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
        const lastNumbers = lastMove.match(/\d+/g); // Extract all numbers
        const lastNumber = parseInt(lastNumbers[lastNumbers.length - 1], 10); // Parse the last number
        const nextNumber = lastNumber + 1;
        setCurrentRange([nextNumber, nextNumber + 1, nextNumber + 2]);
      } else {
        setCurrentRange([1, 2, 3]);
      }
    };

    connect();
  }, [username]);

  const sendMove = () => {
    if (connected && username && move.length > 0) {
      const gameMessage = { player: username, numbers: move };
      console.log("Sending move: ", gameMessage);
      stompClient.send("/app/move", {}, JSON.stringify(gameMessage));
      setMove([]);
    }
  };

  const resetGame = () => {
    if (connected) {
      console.log("Resetting game");
      stompClient.send("/app/reset", {}, JSON.stringify({}));
    }
  };

  const handleNumberClick = (number) => {
    setMove([number]); // 마지막 숫자만 배열에 저장
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
            disabled={gameState.currentTurn !== username} // Disable buttons if game is over or not current turn
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={sendMove}
        className="mb-4 p-2 bg-green-500 text-white rounded"
        disabled={move.length === 0 || gameState.currentTurn !== username} // Disable send button if game is over, no numbers are selected, or not current turn
      >
        Send Move
      </button>

      {username === "닉네임" && ( // 방장만 리셋 가능하게
        <button
          onClick={resetGame}
          className="mb-4 p-2 bg-red-500 text-white rounded"
        >
          Reset Game
        </button>
      )}
      <div>
        <h2 className="text-xl font-bold mb-2">Game State</h2>
        <ul className="list-disc list-inside">
          {gameState.moves.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">
          Current Turn: {gameState.currentTurn}
        </h2>
        <h2 className="text-xl font-bold mb-2">
          Players: {gameState.players.join(", ")}
        </h2>
      </div>
    </div>
  );
};

export default Game31;
