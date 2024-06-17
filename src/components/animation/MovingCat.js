import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./MovingCat.json";
import "./MovingCat.css"; // CSS 파일을 가져옵니다.

const MovingCat = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => animation.destroy(); // Clean up on unmount
  }, []);

  return (
    <div
      className="animation-container"
      ref={animationContainer}
      style={{ width: "25vw", height: "30vw" }}
    />
  );
};

export default MovingCat;
