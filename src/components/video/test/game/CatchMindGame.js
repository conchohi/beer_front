import React, { useRef, useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WEB_SOCKET_SERVER } from '../../../../api/websocketApi';
import { FaEraser, FaPen } from 'react-icons/fa';


const CatchMindGame = ({ roomNo, nickname, participantList = [] }) => {
  const canvasRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingData, setDrawingData] = useState([]);
  const [topic, setTopic] = useState('');
  const [currentTurn, setCurrentTurn] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(2);
  const [isErasing, setIsErasing] = useState(false);
  const [scores, setScores] = useState({});
  const [winner, setWinner] = useState('');
  const [gameSelected, setGameSelected] = useState('');

  useEffect(() => {
    const socket = new SockJS(WEB_SOCKET_SERVER);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/game/${roomNo}/drawing`, (message) => {
        const drawing = JSON.parse(message.body);
        drawFromData(drawing);
      });

      stompClient.subscribe(`/topic/game/${roomNo}/correct`, (message) => {
        setMessage(`${message.body}님이 정답을 맞췄습니다!`);
        clearCanvas();
        setTimeout(() => {
          setMessage('');
        }, 1000);
      });

      stompClient.subscribe(`/topic/game/${roomNo}`, (message) => {
        const gameState = JSON.parse(message.body);
        setCurrentTurn(gameState.currentTurn);
        setTopic(gameState.topic);
        setScores(gameState.scores);
        if (gameState.winner) {
          setWinner(gameState.winner);
          setTimeout(() => {
            setWinner('');
            setGameSelected('');
            setScores({});
            setCurrentTurn('');
            setTopic('');
          }, 3000);
        }
      });

      stompClient.subscribe(`/topic/game/${roomNo}/select`, (message) => {
        const gameMessage = JSON.parse(message.body);
        setGameSelected(gameMessage.content);
      });

      stompClient.subscribe(`/topic/game/${roomNo}/erase`, (message) => {
        clearCanvas();
      });

      stompClient.send(`/app/start/${roomNo}`, {}, JSON.stringify({ player: nickname, players: participantList.map(p => p.nickname) }));
    });

    setStompClient(stompClient);

    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, [roomNo, nickname]);

  const startDrawing = ({ nativeEvent }) => {
    if (currentTurn !== nickname || winner) return;
    const { offsetX, offsetY } = nativeEvent;
    setDrawingData([{ x: offsetX, y: offsetY, color, lineWidth }]);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || winner) return;
    const { offsetX, offsetY } = nativeEvent;
    const newPoint = { x: offsetX, y: offsetY, color: isErasing ? 'white' : color, lineWidth: isErasing ? 10 : lineWidth };
    const updatedDrawingData = [...drawingData, newPoint];
    setDrawingData(updatedDrawingData);
    drawLine(drawingData[drawingData.length - 1], newPoint);
    if (stompClient && stompClient.connected) {
      stompClient.send(`/app/draw/${roomNo}`, {}, JSON.stringify(updatedDrawingData));
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
    if (stompClient && stompClient.connected) {
      stompClient.send(`/app/draw/${roomNo}`, {}, JSON.stringify(drawingData));
      setDrawingData([]);
    }
  };

  const drawLine = (start, end) => {
    if (!start) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = end.color;
    ctx.lineWidth = end.lineWidth;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  };

  const drawFromData = (data) => {
    if (!data.length) return;
    for (let i = 1; i < data.length; i++) {
      drawLine(data[i - 1], data[i]);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (stompClient && stompClient.connected) {
      stompClient.send(`/app/guessCatchMind/${roomNo}`, {}, JSON.stringify({ player: nickname, guess }));
    }
    setGuess('');
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleLineWidthChange = (e) => {
    setLineWidth(e.target.value);
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  const clearAll = () => {
    if (stompClient && stompClient.connected) {
      stompClient.send(`/app/erase/${roomNo}`, {}, {});
      setDrawingData([]);
    }
  };

  const handleGameSelect = (game) => {
    if (stompClient && stompClient.connected) {
      stompClient.send(`/app/selectGame/${roomNo}`, {}, JSON.stringify({ content: game }));
    }
  };

  return (
    <div className="game-box flex flex-col items-center">
      <h1 className="text-2xl font-bold">캐치마인드</h1>
      {winner ? (
        <div className="winner-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="winner text-5xl text-white font-bold p-5 bg-blue-500 rounded-lg shadow-lg">
            {winner}님이 승리하셨습니다!
          </div>
        </div>
      ) : (
        <>
          {message && (
            <div className="message-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
              <div className="message text-5xl text-white font-bold p-5 bg-green-500 rounded-lg shadow-lg">{message}</div>
            </div>
          )}
          <div className="topic text-blue-500 font-bold">출제자: {currentTurn}</div>
          {currentTurn === nickname && <div className="topic text-red-500 font-bold">주제: {topic}</div>}
          <canvas
            ref={canvasRef}
            width="320"
            height="320"
            className="border-2 border-black bg-white"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
          ></canvas>
           {currentTurn === nickname && (
            <div className="controls mt-4 flex items-center">
              <input type="color" value={color} onChange={handleColorChange} className="rounded mr-4 h-8" />
              <select value={lineWidth} onChange={handleLineWidthChange} className="rounded mr-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <button onClick={toggleEraser} className="h-8 w-8 ml-2 p-2 bg-pink-400 text-white rounded">
                {isErasing ? <FaPen /> : <FaEraser />}
              </button>
              <button onClick={clearAll} className="h-8 ml-2 pl-2 pr-2 bg-pink-500 text-white rounded">전체 지우기</button>
            </div>
          )}
          {currentTurn !== nickname && (
            <form onSubmit={handleGuessSubmit} className="mt-4">
              <input
                type="text"
                value={guess}
                onChange={handleGuessChange}
                placeholder="정답을 입력하세요"
                className="border p-2 rounded"
              />
              <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">전송</button>
            </form>
          )}
        </>
      )}
      <div className="scores mt-4 w-full">
        <h2 className="text-xl font-bold">참가자 점수</h2>
        <ul className='grid grid-cols-2 gap-4'>
          {participantList.map(participant => (
            <li key={participant.nickname} className="mt-2">
              {participant.nickname}: {scores[participant.nickname] || 0}점
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatchMindGame;
