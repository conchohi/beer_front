import React, { useEffect, useState } from 'react';

const MAX_STAR_COUNT = 50;
const colors = ["#c77eff", "#f6ff7e", "#ff8d7e", "#ffffff"];

const MeteorEffect = ({ count = 6, white = false, maxDelay = 15, minSpeed = 2, maxSpeed = 4, angle = 45, direction = "right" }) => {
  const starCount = count < MAX_STAR_COUNT ? count : MAX_STAR_COUNT;
  const [starInterval, setStarInterval] = useState(0);

  useEffect(() => {
    const calcStarInterval = () => {
      let innerWidth = window.innerWidth;
      setStarInterval(Math.floor((innerWidth * 1.5) / (count * 5)));
    };
    calcStarInterval();
    window.addEventListener("resize", calcStarInterval);
    return () => {
      window.removeEventListener("resize", calcStarInterval);
    };
  }, [count]);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {(new Array(starCount)).fill(0).map((_, idx) => {
        const left = `${50 + Math.random() * 80}vw`; // 별똥별이 화면 오른쪽 50%에서 시작하도록 설정
        const top = `${Math.random() * 100}vh`; // 별똥별이 화면 전체 높이에서 시작하도록 설정
        const animationDelay = `${Math.random() * maxDelay}s`; // 애니메이션 지연 시간 설정
        const animationDuration = maxSpeed > minSpeed ? `${minSpeed + Math.random() * (maxSpeed - minSpeed)}s` : `${2 + Math.random() * 4}s`; // 애니메이션 지속 시간 설정
        const colorIndex = Math.floor(Math.random() * colors.length); // 별똥별 색상 선택
        const size = `${2 + Math.floor(Math.random() * 15)}px`; // 별똥별 크기 설정
        const boxShadow = `0px 0px 10px 3px ${colors[colorIndex]}`; // 별똥별 그림자 설정
        return <div key={idx} style={{ left, top, animationDelay, animationDuration, boxShadow, width: size, height: size }} className="shooting-star"></div>;
      })}
    </div>
  );
}

export default MeteorEffect;
