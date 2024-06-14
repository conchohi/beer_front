import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const LiarGame = ({ roomNo, nickname, participantList = [] }) => {
  const [stompClient, setStompClient] = useState(null);
  const [liar, setLiar] = useState('');
  const [topic, setTopic] = useState('');
  const [gameTimeLeft, setGameTimeLeft] = useState(600); // 10분 (600초)
  const [votes, setVotes] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVotingTime, setIsVotingTime] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new SockJS(`${API_SERVER_HOST}/wss`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/game/${roomNo}`, (message) => {
        const gameState = JSON.parse(message.body);
        setLiar(prevLiar => prevLiar || gameState.liar); // 처음 설정된 후 변경되지 않도록 함
        setVotes(gameState.votes);
        if (gameState.message) setMessage(gameState.message);
        if (gameState.isGameOver) {
          setIsGameOver(true);
          setIsVotingTime(false);
          setMessage(`게임 종료! ${gameState.message}`);
        }
      });

      stompClient.subscribe(`/topic/game/${roomNo}/topic`, (message) => {
        const gameMessage = JSON.parse(message.body);
        if (gameMessage.player === nickname) {
          setTopic(gameMessage.content || "당신은 라이어입니다.");
        }
      });

      stompClient.send(`/app/startLiarGame/${roomNo}`, {}, JSON.stringify({ player: nickname, players: participantList.map(p => p.nickname) }));
    });

    setStompClient(stompClient);

    const timer = setInterval(() => {
      if (!isGameOver && gameTimeLeft > 0) {
        setGameTimeLeft(prev => prev - 1);
      }
      if (gameTimeLeft === 0 && !isVotingTime) { // 게임 시간이 끝나면 투표 시간 시작
        setIsVotingTime(true);
        setGameTimeLeft(30); // 투표 시간 30초 설정
      }
    }, 1000);

    return () => {
      if (stompClient) stompClient.disconnect();
      clearInterval(timer);
    };
  }, [roomNo, nickname, participantList, gameTimeLeft, isGameOver]);

  const handleVote = (voteFor) => {
    if (stompClient) {
      stompClient.send(`/app/voteLiarGame/${roomNo}`, {}, JSON.stringify({ player: nickname, voteFor }));
    }
  };

  return (
    <div className="game-box flex flex-col items-center bg-gray-200 shadow-lg p-10 h-full">
      <h1 className="text-2xl font-bold">라이어 게임</h1>
      {message && (
        <div className="winner-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="winner text-5xl text-white font-bold p-5 bg-blue-500 rounded-lg shadow-lg">
            {message}
          </div>
        </div>
      )}
      <div className="topic mt-4">
        {liar === nickname ? "당신은 라이어입니다." : `주제: ${topic}`}
      </div>
      <div className="game-time mt-4">
        게임 시간: {Math.floor(gameTimeLeft / 60)}분 {gameTimeLeft % 60}초
      </div>
      {isVotingTime && !isGameOver && (
        <div className="voting-instructions mt-4">
          투표 시간입니다. 각 참가자는 한 명에게 투표하세요.
        </div>
      )}
      <div className="participants mt-4">
        <h2 className="text-xl font-bold">참가자</h2>
        <ul>
          {participantList.map(participant => (
            <li key={participant.nickname} className="mt-2">
              {participant.nickname}
              {isVotingTime && !isGameOver && (
                <button 
                  onClick={() => handleVote(participant.nickname)} 
                  className="ml-2 p-1 bg-red-500 text-white rounded"
                >
                  투표
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiarGame;
