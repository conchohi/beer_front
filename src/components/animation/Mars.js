import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./Mars.json";
import "./Mars.css";

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
      className="absolute w-40 h-40 orbit"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-100%, -100%)",
      }}
    />
  );
};

export default Mars;
