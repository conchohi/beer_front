import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./JoinAni.json";

const JoinAni = () => {
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

  return <div ref={animationContainer} style={{ width: '30vw', height: '30vw' }} />;
};

export default JoinAni;
