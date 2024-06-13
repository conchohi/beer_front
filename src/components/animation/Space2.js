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

  return <div className="items-center" ref={animationContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Space2;
