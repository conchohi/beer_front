import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WEB_SOCKET_SERVER } from '../../../../api/websocketApi';


const LiarGame = ({ roomNo, nickname, participantList = [] }) => {
  const [stompClient, setStompClient] = useState(null);
  const [liar, setLiar] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [gameTimeLeft, setGameTimeLeft] = useState(10); // 5분 (300초)
  const [vote, setVote] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVotingTime, setIsVotingTime] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new SockJS(WEB_SOCKET_SERVER);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/game/${roomNo}`, (message) => {
        const gameState = JSON.parse(message.body);
        setLiar(gameState.liar); // 처음 설정된 후 변경되지 않도록 함
        if (gameState.message){
          setMessage(gameState.message);
          setTimeout(() => {
            setIsVotingTime(false);
            setMessage('');
          }, 3000);
        }
      });

      stompClient.subscribe(`/topic/game/${roomNo}/topic`, (message) => {
        const gameMessage = JSON.parse(message.body);
        if (gameMessage.player === nickname) {
          let content = gameMessage.content;
          let subject = content.split(" ")[0];
          let topic = content.split(" ")[1];
          setSubject(subject)
          setTopic(topic || "당신은 라이어입니다.");
        }
      });

      stompClient.send(`/app/startLiarGame/${roomNo}`, {}, JSON.stringify({ player: nickname, players: participantList.map(p => p.nickname) }));
    });

    setStompClient(stompClient);

    const timer = setInterval(() => {
      setGameTimeLeft(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return 0; // 0 이하로 내려가지 않게 함
        }
      });
    }, 1000);
    

    return () => {
      if (stompClient) stompClient.disconnect();
      clearInterval(timer);
    };
  }, [roomNo, nickname]);
  
  useEffect(() => {
    if (gameTimeLeft === 0 && !isVotingTime && !isGameOver) {
      setIsVotingTime(true);
      setGameTimeLeft(10); // 투표 시간 30초 설정
    } else if (gameTimeLeft === 0 && isVotingTime) {
      setIsGameOver(true);
    }
  }, [gameTimeLeft, isVotingTime, isGameOver]);

  useEffect(()=>{
    if(isGameOver){
      stompClient.send(`/app/endLiarGame/${roomNo}`);
      
    }
  },[isGameOver])

  const handleVote = (voteFor) => {
    setVote(voteFor);
    if (stompClient) {
      stompClient.send(`/app/voteLiarGame/${roomNo}`, {}, JSON.stringify({ player: nickname, voteFor }));
    }
  };

  return (
    <div className="game-box flex flex-col items-center bg-gray-200 shadow-lg p-10 h-full">
      <h1 className="text-2xl font-bold">라이어 게임</h1>
      {message && (
        <div className="winner-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="winner text-5xl text-white font-bold p-5 bg-blue-500 rounded-lg shadow-lg text-center flex flex-col">
            실제 라이어 : {liar} <br/>
            최다 득표자 : {message}
          </div>
        </div>
      )}
      <div className="topic mt-4 flex flex-col text-center">
        <span className='text-lg'>{`주제: ${subject}`}</span>
        <span>단어: {topic}</span>
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
              {isVotingTime && !isGameOver && !vote && (
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
