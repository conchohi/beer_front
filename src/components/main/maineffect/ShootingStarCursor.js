import React, { useState, useEffect } from 'react';
import './ShootingStarCursor.css';

const ShootingStarCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setTrail((prevTrail) => [
        ...prevTrail,
        { x: e.clientX, y: e.clientY, id: Math.random(), color: getRandomColor() },
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (trail.length > 10) {
      setTrail(trail.slice(trail.length - 10));
    }
  }, [trail]);

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
          }}
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path d="M12 .587l3.668 10.425h10.952l-8.84 6.419 3.668 10.425-8.84-6.418-8.84 6.418 3.668-10.425-8.84-6.419h10.952z" />
        </svg>
      ))}
    </div>
  );
};

export default ShootingStarCursor;
