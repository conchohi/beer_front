import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WEB_SOCKET_SERVER } from '../../../api/websocketApi';

const ShoutInSilence = ({ roomNo, nickname, participantList = [],currentGame,setCurrentGame, currentTurn, setCurrentTurn }) => {
  const [stompClient, setStompClient] = useState(null);
  const [topic, setTopic] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [scores, setScores] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [winner, setWinner] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const gametitle = "몸으로 말해요";

  useEffect(() => {
    const socket = new SockJS(WEB_SOCKET_SERVER);
    const stompClient = Stomp.over(socket);

    const onMessageReceived = (message) => {
      const gameState = JSON.parse(message.body);
      setCurrentTurn(gameState.currentTurn);
      setTopic(gameState.topic);
      setScores(gameState.scores);

      if (gameState.winner) {
        setWinner(gameState.winner);
        setMessage(`게임 종료! ${gameState.winner}님이 승리했습니다!`);
        setIsGameOver(true);
        setTimeout(() => {
          setWinner(null);
          setMessage('');
          setIsGameOver(false);
          setScores({});
          setTimeLeft(180);
          setCurrentTurn(null);
          setCurrentGame(null);
          setGameEnded(true); // 게임 종료 화면 표시
        }, 4000); // 4초 후에 게임 종료 화면으로 전환
      } else if (gameState.timeLeft !== undefined) {
        setTimeLeft(gameState.timeLeft);
      }
    };

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/game/${roomNo}/correct`, (message) => {
        const correctPlayer = message.body;
        setMessage(`${correctPlayer}님이 정답을 맞췄습니다!`);
        setTimeLeft(180); // 정답 맞추면 타이머 초기화
        setTimeout(() => setMessage(''), 1000);
      });

      stompClient.subscribe(`/topic/game/${roomNo}`, onMessageReceived);

      stompClient.send(`/app/startShoutInSilence/${roomNo}`, {}, JSON.stringify({ player: nickname, players: participantList.map(p => p.nickname) }));
    });

    setStompClient(stompClient);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          if (stompClient && !isGameOver) {
            stompClient.send(`/app/passShoutInSilence/${roomNo}`, {}, JSON.stringify({ player: nickname }));
            return 180;
          }
          return 180;
        }
      });
    }, 1000);

    return () => {
      if (stompClient) stompClient.disconnect();
      clearInterval(timer);
    };
  }, [roomNo, nickname, isGameOver, setCurrentTurn]);

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
      {gameEnded ? ( // 게임 종료 화면 표시
        <div className="game-over flex justify-center items-center w-full h-full">
          <div className="text-2xl text-white font-bold p-5 bg-red-500 rounded-lg shadow-lg">
            게임이 종료되었습니다 
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold">{gametitle}</h1>
          <div className="text-xl font-bold mb-4">현재 출제자: <span className='text-blue-500'>{currentTurn}</span></div>
          {message && (
            <div className="message-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
              <div className="message text-5xl text-white font-bold p-5 bg-green-500 rounded-lg shadow-lg">
                {message}
              </div>
            </div>
          )}
          {currentTurn === nickname && (
            <div className="topic text-xl text-red-500 font-bold">주제: {topic}</div>
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
                    <div className="timer mt-4">
            {isGameOver ? '게임 종료' : `남은 시간: ${Math.floor(timeLeft / 60)}분 ${timeLeft % 60}초`}
          </div>
          <div className="scores mt-4">
            <h2 className="font-bold">참가자 점수</h2>
            <ul>
              {participantList.map(participant => (
                <li key={participant.nickname} className="mt-2">
                  {participant.nickname}: {scores[participant.nickname] || 0}점
                </li>
              ))}
            </ul>
          </div>

          {winner && (
            <div className="winner-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
              <div className="winner text-5xl text-white font-bold p-5 bg-blue-500 rounded-lg shadow-lg">
                {winner}님이 승리하셨습니다!
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShoutInSilence;
