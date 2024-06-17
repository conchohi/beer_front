import { Stomp } from "@stomp/stompjs";
import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { WEB_SOCKET_SERVER } from "../../../api/websocketApi";

let stompClient = null;

const BalanceGame = ({ nickname, roomNo, participantList = [], master }) => {
  const [gameState, setGameState] = useState({
    choices: ["", ""],
    choice0: 0,
    choice1: 0,
    currentTurn: "",
    players: participantList.map((player) => player.nickname),
    currentRound: 0,
    totalRounds: 3,
    balanceGameVotes: [],
  });
  const [stompClient, setStompClient] = useState(null);
  const [roundResults, setRoundResults] = useState([]);
  const [timer, setTimer] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnd, setGameEnd] = useState(false)
  const [connected, setConnected] = useState(false);
  const [vote, setVote] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS(WEB_SOCKET_SERVER);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      setConnected(true)
      stompClient.subscribe(`/topic/game/${roomNo}`, onMessageReceived);
    });

    setStompClient(stompClient);
    const onMessageReceived = (message) => {
      const gameMessage = JSON.parse(message.body);
      console.log("Message received: ", gameMessage);

      setGameState((prevState) => ({
        ...prevState,
        choices: gameMessage.choices, //선택지
        choice0: gameMessage.choice0, //옵션 선택한 개수
        choice1: gameMessage.choice1, //옵션 선택한 개수
        players: gameMessage.players, //
        currentRound: gameMessage.currentRound,
        balanceGameVotes: gameMessage.balanceGameVotes || [],
      }));

      if(gameMessage.balanceGameVotes.length === 0){
        setGameStarted(true);
      }

      if (gameMessage.balanceGameVotes.length === participantList.length) {
        setGameStarted(false)
        setVote("")
        clearInterval(timerRef.current);
      }
    };
    

    return () => {
      
        if (stompClient) stompClient.disconnect();
        clearInterval(timerRef.current);
      };
    
  }, [nickname, roomNo]);

  useEffect(()=>{
    if (connected && nickname) {
      console.log("Sending vote:", vote);
      const voteMessage = { player: nickname, voteFor:vote };
      stompClient.send(`/app/voteBalanceGame/${roomNo}`, {}, JSON.stringify(voteMessage));
      console.log(`>>> SEND vote to /app/voteBalanceGame/${roomNo}:`, voteMessage);
    } else {
      console.log("Cannot send vote. Conditions not met.");
    }
  }, [vote]);

  useEffect(() => {
    if (gameStarted) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(timerRef.current);
            setGameStarted(false);
            setVote("");
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStarted]);

  const endRound = () => {
    if (connected) {
      const roundResult = {
        round: gameState.currentRound,
        choices: gameState.choices,
        choice0: gameState.choice0,
        choice1: gameState.choice1,
      };
      setRoundResults((prevResults) => [...prevResults, roundResult]);
      if(gameState.currentRound === gameState.totalRounds){
        setGameEnd(true)
      } else{
        setGameStarted(true)
        setTimer(30)
      }

      stompClient.send(`/app/endRoundBalanceGame/${roomNo}`, {}, JSON.stringify({}));
    }
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
      {gameEnd ?  (
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
      ) : 
      <>
      {!gameStarted && nickname === master && gameState.currentRound === 0 && (
        <button onClick={startGame} className="mb-4 p-2 bg-blue-500 text-white rounded">
          게임 시작
        </button>
      )}
      {gameStarted && (<>
        <div>
          <h2 className="text-xl font-bold mb-2">당신의 선택은?</h2>
          { !vote ? 
          <div className="mb-4">
            <button onClick={() => setVote("choice0")} className="m-2 p-2 bg-green-500 text-white rounded">
              {gameState.choices[0]}
            </button>
            <button onClick={() => setVote("choice1")} className="m-2 p-2 bg-red-500 text-white rounded">
              {gameState.choices[1]}
            </button>
          </div> 
          :
          <div>잠시만 기다려주세요</div>
          }
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">타이머: {timer}초</h2>
        </div>
      </>
      )}
      {!gameStarted && gameState.currentRound > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{gameState.currentRound} 라운드 결과</h3>
          <ul className="list-disc list-inside">
            <li>
              {gameState.choices[0]} : {gameState.choice0} 명
            </li>
            <li>
              {gameState.choices[1]} : {gameState.choice1} 명
            </li>
          </ul>
          <button onClick={endRound} className="mb-4 p-2 bg-blue-500 text-white rounded">
          다음 게임
        </button>
        </div>

      )}
      </>
}
      
    </div>
  );
};

export default BalanceGame;
