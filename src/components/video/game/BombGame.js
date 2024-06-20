import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WEB_SOCKET_SERVER } from '../../../api/websocketApi';
import Explode from '../../animation/bomb/Explode';
import Bomb from '../../animation/bomb/Bomb';

const BombGame = ({ roomNo, nickname, participantList = [] }) => {
  const [stompClient, setStompClient] = useState(null);
  const [gameTimeLeft, setGameTimeLeft] = useState(300);
  const [bomb, setBomb] = useState('');
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const socket = new SockJS(WEB_SOCKET_SERVER);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/game/${roomNo}`, (message) => {
        const gameState = JSON.parse(message.body);
        if (gameState.timeLeft) {
          setGameTimeLeft(gameState.timeLeft)
        }
        setBomb(gameState.bomb)
      });

      stompClient.send(`/app/startBombGame/${roomNo}`, {}, JSON.stringify({ players: participantList.map(p => p.nickname) }));
    });

    setStompClient(stompClient);

    const timer = setInterval(() => {
      setGameTimeLeft(prev => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });

    }, 1000);

    return () => {
      if (stompClient) stompClient.disconnect();
      clearInterval(timer);
    };
  }, [roomNo, nickname]);


  const handleSend = (bomb) => {
    if (stompClient) {
      stompClient.send(`/app/sendBomb/${roomNo}`, {}, JSON.stringify({ player: bomb }));
    }
  };

  useEffect(() => {
    if (gameTimeLeft <= 0) {
      setIsEnd(true)
      setTimeout(() => {
        setIsEnd(false);
      }, 2500);
    }
  }, [gameTimeLeft])

  return (
    <div className="game-box flex flex-col items-center bg-gray-200 shadow-lg p-10 h-full">
      <h1 className="text-2xl font-bold">폭탄 게임</h1>
      {isEnd && (
        <div className="winner-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="winner text-white text-5xl font-bold p-5 bg-red-500 rounded-lg shadow-lg flex flex-col text-center">
            <Explode />
            <span className='mt-5'>{bomb}님 손에서 터졌습니다.</span>
          </div>
        </div>
      )}
      <div className="mt-4 relative flex flex-col">
        <span className='font-bold text-center text-3xl'>{bomb}</span>
        <Bomb className='w-48 h-48' />
      </div>
      <div className="game-time mt-4">
        게임 시간: {gameTimeLeft > 0 ? "?" : gameTimeLeft} 초
      </div>
      <div className="participants mt-4">
        <h2 className="text-xl font-bold">참가자</h2>
        <ul>
          {participantList.map(participant => (
            <li key={participant.nickname} className="mt-2">
              {participant.nickname}
              {nickname === bomb && participant.nickname !== nickname && (
                <button
                  onClick={() => handleSend(participant.nickname)}
                  className="ml-2 p-1 bg-red-500 text-white rounded"
                >
                  전달
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BombGame;
