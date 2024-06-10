import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./SpaceCat.json";

const SpaceCat = () => {
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
    <div ref={animationContainer} style={{ width: "60vw", height: "60vw" }} />
  );
};

export default SpaceCat;
