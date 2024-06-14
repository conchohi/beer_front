import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WEB_SOCKET_SERVER } from '../../../../api/websocketApi';

const ShoutInSilence = ({ roomNo, nickname, participantList = [] }) => {
  const [stompClient, setStompClient] = useState(null);
  const [topic, setTopic] = useState('');
  const [currentTurn, setCurrentTurn] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [scores, setScores] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    const socket = new SockJS(WEB_SOCKET_SERVER);
    const stompClient = Stomp.over(socket);

    const onMessageReceived = (message) => {
      const gameState = JSON.parse(message.body);
      setCurrentTurn(gameState.currentTurn);
      setTopic(gameState.topic);
      setScores(gameState.scores);
      setIsGameOver(gameState.isGameOver);
      setTimeLeft(gameState.timeLeft);

      if (gameState.isGameOver) {
        if (gameState.winner) {
          setMessage(`게임 종료! ${gameState.winner}님이 승리했습니다!`);
        } else {
          setMessage(`게임 종료!`);
        }
        setTimeout(() => {
          setMessage('');
          setIsGameOver(false);
          setScores({});
          setTimeLeft(180);
        }, 2000);
      }
    };

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/game/${roomNo}/correct`, (message) => {
        const correctPlayer = message.body;
        setMessage(`${correctPlayer}님이 정답을 맞췄습니다!`);
        setTimeout(() => setMessage(''), 3000);
      });

      stompClient.subscribe(`/topic/game/${roomNo}`, onMessageReceived);

      stompClient.send(`/app/startShoutInSilence/${roomNo}`, {}, JSON.stringify({ player: nickname, players: participantList.map(p => p.nickname) }));
    });

    setStompClient(stompClient);

    const timer = setInterval(() => {
      if (!isGameOver && timeLeft > 0) {
        setTimeLeft(prev => prev - 1);
      } else if (timeLeft === 0) {
        if (stompClient) {
          stompClient.send(`/app/passShoutInSilence/${roomNo}`, {}, JSON.stringify({ player: nickname }));
          setTimeLeft(180);
        }
      }
    }, 1000);

    return () => {
      if (stompClient) stompClient.disconnect();
      clearInterval(timer);
    };
  }, [roomNo, nickname, participantList, timeLeft, isGameOver]);

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (stompClient && guess.trim()) {
      stompClient.send(`/app/guessShoutInSilence/${roomNo}`, {}, JSON.stringify({ player: nickname, guess }));
      setGuess('');
    }
  };

  return (
    <div className="game-box flex flex-col items-center bg-gray-200 shadow-lg p-10 h-full">
      <h1 className="text-2xl font-bold">고요 속의 외침</h1>
      {message && (
        <div className="winner-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="winner text-5xl text-white font-bold p-5 bg-green-500 rounded-lg shadow-lg">
            {message}
          </div>
        </div>
      )}
      {isGameOver && (
        <div className="game-over-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="game-over text-5xl text-white font-bold p-5 bg-red-500 rounded-lg shadow-lg">
            게임 종료
          </div>
        </div>
      )}
      {currentTurn === nickname && (
        <div className="topic text-red-500 font-bold">주제: {topic}</div>
      )}
      {currentTurn !== nickname && (
        <form onSubmit={handleGuessSubmit} className="mt-4">
          <input
            type="text"
            value={guess}
            onChange={handleGuessChange}
            placeholder="정답을 입력하세요"
            className="border p-2 rounded"
            disabled={isGameOver}
          />
          <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded" disabled={isGameOver}>
            전송
          </button>
        </form>
      )}
      <div className="scores mt-4">
        <h2 className="text-xl font-bold">참가자 점수</h2>
        <ul>
          {participantList.map(participant => (
            <li key={participant.nickname} className="mt-2">
              {participant.nickname}: {scores[participant.nickname] || 0}점
            </li>
          ))}
        </ul>
      </div>
      <div className="timer mt-4">
        {isGameOver ? '게임 종료' : `남은 시간: ${Math.floor(timeLeft / 60)}분 ${timeLeft % 60}초`}
      </div>
    </div>
  );
};

export default ShoutInSilence;
