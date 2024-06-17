import { Stomp } from "@stomp/stompjs";
import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { API_SERVER_HOST } from "../../../../api/axios_intercepter";

let stompClient = null;

const BalanceGame = ({ nickname, roomNo, participantList = [], master }) => {
  const [currentChoices, setCurrentChoices] = useState(["", ""]);
  const [isChoiceInputTime, setIsChoiceInputTime] = useState(false);
  const [gameState, setGameState] = useState({
    choices: ["", ""],
    choice0: 0,
    choice1: 0,
    currentTurn: "",
    players: participantList.map((player) => player.nickname),
    currentRound: 0,
    totalRounds: 3,
    balanceGameVotes: [],
    completedPlayers: [],  // 각 플레이어의 완료 상태 추적
  });
  const [roundResults, setRoundResults] = useState([]);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [connected, setConnected] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS(`${API_SERVER_HOST}/ws`);
      stompClient = Stomp.over(socket);
      stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
      console.log("Connected to WebSocket");
      setConnected(true);
      stompClient.subscribe(`/topic/game/${roomNo}`, onMessageReceived);
      console.log(`>>> SUBSCRIBE to /topic/game/${roomNo}`);
    };

    const onError = (error) => {
      console.error("WebSocket connection error: ", error);
    };

    const onMessageReceived = (message) => {
      const gameMessage = JSON.parse(message.body);
      console.log("Message received: ", gameMessage);

      setGameState((prevState) => ({
        ...prevState,
        choices: gameMessage.choices || ["", ""],
        choice0: gameMessage.choice0 || 0,
        choice1: gameMessage.choice1 || 0,
        currentTurn: gameMessage.currentTurn,
        players: gameMessage.players,
        currentRound: gameMessage.currentRound,
        balanceGameVotes: gameMessage.balanceGameVotes || [],
        completedPlayers: gameMessage.completedPlayers || [],  // 완료된 플레이어 목록
      }));

      if (gameMessage.currentRound > 0 && gameMessage.currentRound <= gameState.totalRounds) {
        setIsChoiceInputTime(false);
        startTimer(30);
      }

      if (gameMessage.currentRound === 1) {
        setGameStarted(true);
      }
    };

    if (gameState.players.length > 0) {
      connect();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [nickname, roomNo, participantList, gameState.players, gameState.totalRounds]);

  const startTimer = (seconds) => {
    clearInterval(timerRef.current);
    setTimer(seconds);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendVote = (vote) => {
    if (connected && nickname) {
      console.log("Sending vote:", vote);
      const voteMessage = { player: nickname, vote };
      stompClient.send(`/app/voteBalanceGame/${roomNo}`, {}, JSON.stringify(voteMessage));
      console.log(`>>> SEND vote to /app/voteBalanceGame/${roomNo}:`, voteMessage);
    } else {
      console.log("Cannot send vote. Conditions not met.");
    }
  };

  const endRound = () => {
    if (connected) {
      const roundResult = {
        round: gameState.currentRound,
        choices: gameState.choices,
        choice0: gameState.choice0,
        choice1: gameState.choice1,
      };
      setRoundResults((prevResults) => [...prevResults, roundResult]);

      // 현재 플레이어를 완료된 플레이어 목록에 추가
      const completedPlayers = [...gameState.completedPlayers, nickname];

      setGameState((prevState) => ({
        ...prevState,
        currentRound: prevState.currentRound + 1,
        choice0: 0,
        choice1: 0,
        balanceGameVotes: [],
        completedPlayers,  // 완료된 플레이어 목록 업데이트
      }));

      if (completedPlayers.length === gameState.players.length) {
        stompClient.send(`/app/endRoundBalanceGame/${roomNo}`, {}, JSON.stringify({}));
        console.log(`>>> SEND endRoundBalanceGame to /app/endRoundBalanceGame/${roomNo}`);
      } else {
        stompClient.send(`/app/updateGameState/${roomNo}`, {}, JSON.stringify({ completedPlayers }));
        console.log(`>>> SEND updateGameState to /app/updateGameState/${roomNo}`);
      }
    }
  };

  const handleVoteClick = (choice) => {
    setGameState((prevState) => {
        const updatedVotes = [...prevState.balanceGameVotes, nickname];
        const updatedState = {
            ...prevState,
            balanceGameVotes: updatedVotes,
            [choice === prevState.choices[0] ? 'choice0' : 'choice1']: prevState[choice === prevState.choices[0] ? 'choice0' : 'choice1'] + 1,
        };

        if (updatedVotes.length === prevState.players.length) {
            endRound();  // 모든 플레이어가 투표를 완료하면 라운드를 종료
        }

        return updatedState;
    });

    sendVote(choice);
};


  const startGame = () => {
    if (connected && nickname === master) {
      stompClient.send(`/app/startBalanceGame/${roomNo}`, {}, JSON.stringify({ players: participantList.map(p => p.nickname) }));
      console.log(`>>> SEND startBalanceGame to /app/startBalanceGame/${roomNo}`);
    }
  };

  return (
    <div className="game-container p-4">
      <h1 className="text-2xl font-bold mb-4">밸런스 게임</h1>
      {!gameStarted && nickname === master && (
        <button onClick={startGame} className="mb-4 p-2 bg-blue-500 text-white rounded">
          게임 시작
        </button>
      )}
      {gameStarted && !isChoiceInputTime && (
        <div>
          <h2 className="text-xl font-bold mb-2">당신의 선택은?</h2>
          <div className="mb-4">
            <button onClick={() => handleVoteClick("choice0")} className="m-2 p-2 bg-green-500 text-white rounded">
              {gameState.choices[0]}
            </button>
            <button onClick={() => handleVoteClick("choice1")} className="m-2 p-2 bg-red-500 text-white rounded">
              {gameState.choices[1]}
            </button>
          </div>
        </div>
      )}
      {gameStarted && (
        <div>
          <h2 className="text-xl font-bold mb-2">타이머: {timer}초</h2>
        </div>
      )}
      {!gameStarted && roundResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">게임 종료</h2>
          <h3 className="text-lg font-semibold">라운드별 결과</h3>
          <ul className="list-disc list-inside">
            {roundResults.map((result, index) => (
              <li key={index}>
                라운드 {result.round}: {result.choices[0]}: {result.choice0}, {result.choices[1]} {result.choice1}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BalanceGame;
