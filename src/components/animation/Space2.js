import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./Space.json";

const Space2 = () => {
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

  return <div className="items-center" ref={animationContainer} style={{ width: '20vw', height: '10vw' }} />;
};

export default Space2;
