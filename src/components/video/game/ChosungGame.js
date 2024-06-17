import React, { useState, useEffect, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { publicApi } from '../../../api/axios_intercepter';
import { WEB_SOCKET_SERVER } from '../../../api/websocketApi';

const ChosungGame = ({ roomNo, nickname, participantList = [], currentGame, setCurrentGame, currentTurn, setCurrentTurn }) => {
  const [stompClient, setStompClient] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [chosung, setChosung] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [penaltyMessage, setPenaltyMessage] = useState('');
  const [minusScoreMessage, setMinusScoreMessage] = useState('');
  const [scores, setScores] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [loser, setLoser] = useState(null);
  const [lastCorrectPlayers, setLastCorrectPlayers] = useState([]);
  const [guessedWords, setGuessedWords] = useState([]);
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const inputRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS(WEB_SOCKET_SERVER);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/game/${roomNo}/correct`, (message) => {
        const correctMessage = message.body;
        setMessage(correctMessage);
        setLastCorrectPlayers(prev => [...prev, correctMessage.split('님이')[0]]);
        setTimeout(() => {
          setMessage('');
        }, 5000); // 5초 후에 통과 메시지 사라짐
      });

      stompClient.subscribe(`/topic/game/${roomNo}`, (message) => {
        const gameState = JSON.parse(message.body);
        if (gameState.loser) {
          setIsGameOver(true);
          setLoser(gameState.loser);
          setPenaltyMessage(`${gameState.loser}님이 패배하였습니다!`);
          setTimeout(() => {
            setLoser(null);
            setPenaltyMessage('');
            setScores({});
            setCurrentTurn(null);
            setCurrentGame(null);
          }, 3000);
        } else {
          setCurrentRound(gameState.round);
          setScores(gameState.scores);
          setChosung(gameState.topic);
          setLastCorrectPlayers([]);
          setGuessedWords([]);
          resetTimer();
        }
      });

      stompClient.subscribe(`/topic/game/${roomNo}/timeout`, (message) => {
        const playersNotGuessed = JSON.parse(message.body);
        if (playersNotGuessed.length > 0) {
          setMinusScoreMessage(`${playersNotGuessed.join(', ')}님이 -1점 받았습니다.`);
          setTimeout(() => setMinusScoreMessage(''), 5000);
        }
      });

      stompClient.subscribe(`/topic/game/${roomNo}/minusScore`, (message) => {
        const player = message.body;
        setMinusScoreMessage(`${player}님이 -1점 받았습니다.`);
        setTimeout(() => setMinusScoreMessage(''), 5000);
      });

      stompClient.send(`/app/startChosungGame/${roomNo}`, {}, JSON.stringify({ player: nickname, players: participantList.map(p => p.nickname) }));
    });

    setStompClient(stompClient);

    return () => {
      if (stompClient) stompClient.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [roomNo, nickname]);

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const validateWord = async (word) => {
    try {
      const response = await publicApi.get(`/api/word/validate-word`, {
        params: { word }
      });
      return response.data; // true or false
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      return false;
    }
  };

  const handleGuessSubmit = async (e) => {
    e.preventDefault();
    setPenaltyMessage('');

    if (lastCorrectPlayers.includes(nickname)) {
      setPenaltyMessage('이미 통과하셨습니다.');
      setGuess('');
      inputRef.current.focus();
      return;
    }

    if (guessedWords.includes(guess)) {
      setPenaltyMessage('이미 제출한 정답입니다.');
      setGuess('');
      inputRef.current.focus();
      return;
    }

    try {
      const isValidWord = await validateWord(guess);
      if (!isValidWord) {
        setPenaltyMessage('없는 단어입니다.');
        setGuess('');
        inputRef.current.focus();
        return;
      }

      if (stompClient && stompClient.connected) {
        stompClient.send(`/app/guessChosung/${roomNo}`, {}, JSON.stringify({ player: nickname, guess }));
        setGuessedWords((prev) => [...prev, guess]);
      }
    } catch (error) {
      setPenaltyMessage('단어 검증 중 오류가 발생했습니다.');
    }

    setGuess('');
    inputRef.current.focus();
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(20);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeout = () => {
    if (stompClient && stompClient.connected) {
      stompClient.send(`/app/timeoutChosung/${roomNo}`, {}, JSON.stringify({ player: nickname }));
    }
  };

  const nextRound = () => {
    if (stompClient) {
      stompClient.send(`/app/startChosungGame/${roomNo}`, {}, JSON.stringify({ player: nickname, players: participantList.map(p => p.nickname) }));
    }
  };

  return (
    <div className="game-box flex flex-col items-center md:p-4 w-full">
      <h1 className="text-2xl font-bold">초성퀴즈</h1>
      {message && <div className="message text-green-500 font-bold">{message}</div>}
      {minusScoreMessage && <div className="minus-score-message text-red-500 font-bold mt-2">{minusScoreMessage}</div>}
      {isGameOver ? (
        <div className="text-red-500 font-bold mb-4">게임 종료! {penaltyMessage}</div>
      ) : (
        <>
          <div className="w-full flex justify-center">
            <div className="border-2 border-black p-4 text-3xl">{chosung}</div>
          </div>
          <div className="timer text-lg font-bold mt-2">남은 시간: {timeLeft}초</div>
          {lastCorrectPlayers.includes(nickname) ? (
            <div className="mt-4 w-full flex flex-col items-center">
              <span className="text-lg font-bold">통과했습니다.</span>
            </div>
          ) : (
            <form onSubmit={handleGuessSubmit} className="mt-4 w-full flex flex-col items-center">
              <input
                ref={inputRef}
                type="text"
                value={guess}
                onChange={handleGuessChange}
                placeholder="정답을 입력하세요"
                className="border p-2 rounded w-full md:w-1/2"
              />
              <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded w-full md:w-1/2">전송</button>
              {penaltyMessage && <div className="text-red-500 font-bold mt-2">{penaltyMessage}</div>}
            </form>
          )}
          <div className="scores mt-4 w-full">
            <h2 className="text-xl font-bold">참가자 점수</h2>
            <ul className="grid grid-cols-2 gap-4">
              {participantList.map(participant => (
                <li key={participant.nickname} className="mt-2">
                  {participant.nickname}: {scores[participant.nickname] || 0}점
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {loser && (
        <div className="loser-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="loser text-5xl text-white font-bold p-5 bg-red-500 rounded-lg shadow-lg">
            {loser}님이 패배하셨습니다!
          </div>
        </div>
      )}
    </div>
  );
};

export default ChosungGame;
