import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./Saturn.json";
import "./Saturn.css";

const Saturn = () => {
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
    <div className="orbit-container">
      <div
        ref={animationContainer}
        className="saturn"
        style={{
          width: "20vw",
          height: "20vw",
        }}
      />
    </div>
  );
};

export default Saturn;
