import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./Mars.json";
import "./Mars.css"; // CSS 파일 가져오기

const Mars = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => animation.destroy(); 
  }, []);

  return (
    <div
      ref={animationContainer}
      className="absolute w-20 h-96 orbit" 
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Mars;
