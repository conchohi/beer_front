import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WEB_SOCKET_SERVER } from '../../../api/websocketApi';

const CharacterGame = ({ roomNo, nickname, participantList = [], currentGame, setCurrentGame, currentTurn, setCurrentTurn }) => {
  const [stompClient, setStompClient] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [scores, setScores] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10); // 타이머를 10초로 설정
  const [roundEnded, setRoundEnded] = useState(false);

  // 웹소켓 연결 설정
  useEffect(() => {
    const socket = new SockJS(WEB_SOCKET_SERVER);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      // 정답 맞춘 메시지 구독
      stompClient.subscribe(`/topic/game/${roomNo}/correct`, (message) => {
        setMessage(`${message.body}님이 정답을 맞췄습니다!`);
        setTimeout(() => setMessage(''), 5000);
        setTimeout(nextRound, 5000);
      });

      // 게임 상태 변경 메시지 구독
      stompClient.subscribe(`/topic/game/${roomNo}`, (message) => {
        const gameState = JSON.parse(message.body);
        if (gameState.winner) {
          setIsGameOver(true);
          setWinner(gameState.winner);
          setMessage(`${gameState.winner}님이 승리하셨습니다!`);
          setTimeout(() => {
            setWinner(null);
            setMessage('');
            setCurrentTurn(null);
            setCurrentGame(null);
          }, 3000);
        } else {
          setCurrentRound(gameState.round);
          setScores(gameState.scores);
          setImageUrl(`/charactergame/${gameState.topic}.jpg`);
          setRoundEnded(false);
          setTimeLeft(10); 
        }
      });

      stompClient.send(`/app/startCharacterGame/${roomNo}`, {}, JSON.stringify({ player: nickname, players: participantList.map(p => p.nickname) }));
    });

    setStompClient(stompClient);

    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, [roomNo, nickname]);

  // 타이머 설정
  useEffect(() => {
    if (!roundEnded && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !roundEnded) {
      handleTimeExpired();
    }
  }, [timeLeft, roundEnded]);

  // 정답 입력 핸들러
  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  // 정답 제출 핸들러
  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (stompClient) {
      stompClient.send(`/app/guessCharacter/${roomNo}`, {}, JSON.stringify({ player: nickname, guess }));
    }
    setGuess('');
  };

  // 시간 만료 핸들러
  const handleTimeExpired = () => {
    setRoundEnded(true);
    if (stompClient) {
      stompClient.send(`/app/charactergamehandleTimeExpired/${roomNo}`, {});
    }
  };

  // 다음 라운드 시작 핸들러
  const nextRound = () => {
    if (stompClient) {
      stompClient.send(`/app/startCharacterGame/${roomNo}`, {}, JSON.stringify({ player: nickname, players: participantList.map(p => p.nickname) }));
    }
  };

  return (
    <div className="game-box flex flex-col items-center w-full">
      <h1 className="text-2xl font-bold ">연예인퀴즈</h1>
      <div className="message text-green-500 font-bold h-6">{message}</div>
      {isGameOver ? (
        <div className="text-red-500 font-bold mb-4">게임 종료! {message}</div>
      ) : (
        <>
          <div className="w-full flex justify-center mb-3">
            <img 
              src={imageUrl} 
              alt="연예인 퀴즈" 
              className="border-2 border-black w-[200px] h-[300px] "
            />
          </div>
          <div className="timer font-bold">남은 시간 : {timeLeft}</div>
          <form onSubmit={handleGuessSubmit} className="mt-4 w-full flex flex-col items-center">
            <input
              type="text"
              value={guess}
              onChange={handleGuessChange}
              placeholder="정답을 입력하세요"
              className="border p-2 rounded w-full"
            />
            <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded w-full">전송</button>
          </form>
          <div className="scores mt-4 w-full">
            <h2 className="text-xl font-bold">참가자 점수</h2>
            <ul className="grid grid-cols-2 gap-2 text-lg font-bold">
              {participantList.map(participant => (
                <li key={participant.nickname} className="mt-2">
                  {participant.nickname}: {scores[participant.nickname] || 0}점
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {winner && (
        <div className="winner-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="winner text-5xl text-white font-bold p-5 bg-blue-500 rounded-lg shadow-lg">
            {winner}님이 승리하셨습니다!
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterGame;
