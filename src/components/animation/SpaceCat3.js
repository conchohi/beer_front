import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./SpaceCat.json";

const SpaceCat3 = () => {
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

  return <div className="absolute -z-50" ref={animationContainer} style={{ width: '100vw', height: '100vw' }} />;
};

export default SpaceCat3;
