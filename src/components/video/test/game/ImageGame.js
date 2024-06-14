import React, { useRef, useEffect, useState } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_SERVER_HOST } from '../../../../api/axios_intercepter';

const ImageGame = ({ roomNo, nickname }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [handData, setHandData] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS(`${API_SERVER_HOST}/ws`); // WebSocket URL
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/game/${roomNo}`, (message) => {
        const gameState = JSON.parse(message.body);
        console.log(gameState);
        if (gameState.losingPlayer === nickname) {
          alert('You lost!');
        }
      });

      stompClient.send(`/app/start/${roomNo}`, {}, JSON.stringify({ player: nickname, players: [nickname] }));
    });

    setStompClient(stompClient);

    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, [roomNo, nickname]);

  useEffect(() => {
    const onResults = (results) => {
      if (results.multiHandLandmarks.length > 0) {
        setHandData(results.multiHandLandmarks[0]);
        drawHand(results.multiHandLandmarks[0]);
      }
    };
  
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
  
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
  
    hands.onResults(onResults);
  
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
  
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      } catch (error) {
        console.error('Failed to acquire camera feed:', error);
      }
    };
  
    startCamera();
  
    return () => {
      if (hands) hands.close();
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);
  

  const drawHand = (landmarks) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    landmarks.forEach((landmark) => {
      ctx.beginPath();
      ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    });
  };

  const checkFingerFold = () => {
    if (!handData) return;
    
    const foldedFingers = handData.filter((landmark, index) => {
      if (index % 4 === 0 && landmark.y > handData[index - 1].y) {
        return true;
      }
      return false;
    }).length;

    if (foldedFingers >= 5 && stompClient) {
      stompClient.send(`/app/fold/${roomNo}`, {}, JSON.stringify({ player: nickname }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkFingerFold();
    }, 1000);

    return () => clearInterval(interval);
  }, [handData]);

  return (
    <div className="game-box flex flex-col items-center">
      <h1 className="text-2xl font-bold">이미지 게임</h1>
      <video ref={videoRef} className="hidden" autoPlay></video>
      <canvas ref={canvasRef} width="640" height="480" className="border-2 border-black"></canvas>
    </div>
  );
};

export default ImageGame;
