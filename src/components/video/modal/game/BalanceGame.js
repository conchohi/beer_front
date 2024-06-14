import { Stomp } from "@stomp/stompjs";
import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { API_SERVER_HOST } from "../../../../api/axios_intercepter";

let stompClient = null;

const BalanceGame = ({ nickname, roomNo, participantList = [], master }) => {
  const [currentChoices, setCurrentChoices] = useState(["", ""]);
  const [isChoiceInputTime, setIsChoiceInputTime] = useState(true); // 선택지 입력 시간 여부
  const [gameState, setGameState] = useState({
    choices: ["", ""],
    choice0: 0,
    choice1: 0,
    currentTurn: master,
    players: participantList.map((player) => player.nickname),
    currentRound: 0,
    totalRounds: 3,
  });
  const [roundResults, setRoundResults] = useState([]);
  const [timer, setTimer] = useState(50); // 50초 타이머
  const [gameStarted, setGameStarted] = useState(false); // 게임 시작 여부
  const [connected, setConnected] = useState(false); // WebSocket 연결 여부
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
      }));

      if (gameMessage.currentRound > 0 && gameMessage.currentRound <= gameState.totalRounds) {
        setIsChoiceInputTime(false);
        startTimer(30); // 투표 시간 30초
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
          if (isChoiceInputTime) {
            handleChoiceSubmit(); // 선택지 입력 시간이 끝나면 라운드 시작
          } else {
            endRound(); // 투표 시간이 끝나면 라운드 종료
          }
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendVote = (vote) => {
    if (connected && nickname) {
      console.log("Sending vote:", vote);
      const voteMessage = { player: nickname, vote };
      stompClient.send(`/app/vote/${roomNo}`, {}, JSON.stringify(voteMessage));
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

      if (gameState.currentRound >= gameState.totalRounds) {
        // 모든 라운드가 끝났을 때 결과를 표시
        setGameStarted(false);
        setIsChoiceInputTime(false);
        stompClient.send(`/app/end-round/${roomNo}`, {}, JSON.stringify({}));
      } else {
        setGameState((prevState) => ({
          ...prevState,
          currentRound: prevState.currentRound + 1,
          choice0: 0, // Reset votes for the new round
          choice1: 0,
        }));
        setIsChoiceInputTime(true);
        startTimer(50); // 다음 라운드 선택지 입력 시간 50초
        stompClient.send(`/app/end-round/${roomNo}`, {}, JSON.stringify({}));
      }
    }
  };

  const startNextRound = () => {
    if (connected && nickname === master) {
      const nextRound = gameState.currentRound + 1;
      if (nextRound > gameState.totalRounds) {
        console.log("All rounds completed");
        return;
      }
      const playerNames = participantList.map((player) => player.nickname);
      const gameMessage = { players: playerNames, round: nextRound, choices: currentChoices };
      stompClient.send(`/app/start/${roomNo}`, {}, JSON.stringify(gameMessage));
      setCurrentChoices(["", ""]); // Reset choices for next round
      startTimer(30); // 투표 시간 30초
    }
  };

  const handleVoteClick = (choice) => {
    sendVote(choice);
    setGameState((prevState) => ({
      ...prevState,
      [choice === prevState.choices[0] ? 'choice0' : 'choice1']: prevState[choice === prevState.choices[0] ? 'choice0' : 'choice1'] + 1,
    }));
    endRound();
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...currentChoices];
    newChoices[index] = value;
    setCurrentChoices(newChoices);
  };

  const handleChoiceSubmit = () => {
    if (currentChoices[0] && currentChoices[1]) {
      clearInterval(timerRef.current);
      setGameState((prevState) => ({
        ...prevState,
        choices: currentChoices,
      }));
      setIsChoiceInputTime(false);
      startTimer(30); // 투표 시간 30초
    } else {
      alert("두 개의 선택지를 모두 입력해 주세요.");
    }
  };

  const startGame = () => {
    if (connected && nickname === master) {
      setGameStarted(true);
      setIsChoiceInputTime(true);
      setGameState((prevState) => ({
        ...prevState,
        currentRound: 1, // 게임 시작 시 첫 라운드 설정
      }));
      startTimer(50); // 선택지 입력 시간 50초
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
      {gameStarted && isChoiceInputTime && nickname === master && (
        <>
          <div className="mb-4">
            <input
              type="text"
              value={currentChoices[0]}
              onChange={(e) => handleChoiceChange(0, e.target.value)}
              placeholder="첫번째 선택지"
              className="mb-2 p-2 border rounded"
            />
            <input
              type="text"
              value={currentChoices[1]}
              onChange={(e) => handleChoiceChange(1, e.target.value)}
              placeholder="두번째 선택지"
              className="p-2 border rounded"
            />
          </div>
          <button onClick={handleChoiceSubmit} className="mb-4 p-2 bg-green-500 text-white rounded">
            입력 완료
          </button>
        </>
      )}
      {gameStarted && !isChoiceInputTime && (
        <div>
          <h2 className="text-xl font-bold mb-2">당신의 선택은?</h2>
          <div className="mb-4">
            <button onClick={() => handleVoteClick(gameState.choices[0])} className="m-2 p-2 bg-green-500 text-white rounded">
              {gameState.choices[0]}
            </button>
            <button onClick={() => handleVoteClick(gameState.choices[1])} className="m-2 p-2 bg-red-500 text-white rounded">
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
                라운드 {result.round}: {result.choices[0]} (예: {result.choice0}), {result.choices[1]} (아니오: {result.choice1})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BalanceGame;
