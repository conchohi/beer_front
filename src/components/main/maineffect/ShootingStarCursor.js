import React, { useState, useEffect } from 'react';
import './ShootingStarCursor.css';

const ShootingStarCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    // 마우스 움직임을 감지하여 커서 위치를 업데이트하고 트레일을 추가합니다.
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setTrail((prevTrail) => [
        ...prevTrail,
        {
          x: e.clientX,
          y: e.clientY,
          id: Math.random(),
          color: getRandomColor(),
          // 별의 크기를 랜덤하게 설정 (최소 16px, 최대 24px)
          size: Math.random() * 16 + 16,
          rotation: Math.random() * 360,
        },
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // 트레일의 길이를 20개로 제한
    if (trail.length > 20) {
      setTrail(trail.slice(trail.length - 20));
    }
  }, [trail]);

  // 랜덤 색상을 생성하는 함수
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      {trail.map((pos) => (
        <svg
          key={pos.id}
          className="star"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            fill: pos.color,
            width: `${pos.size}px`,
            height: `${pos.size}px`,
            transform: `rotate(${pos.rotation}deg)`,
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 10.425h10.952l-8.84 6.419 3.668 10.425-8.84-6.418-8.84 6.418 3.668-10.425-8.84-6.419h10.952z" />
        </svg>
      ))}
    </div>
  );
};

export default ShootingStarCursor;
