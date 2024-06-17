import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./SpaceShip2.json";

const SpaceShip2 = () => {
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
      ref={animationContainer}
      className="w-full h-full pl-5"
      style={{ width: "25vw", height: "35vw" }}
    />
  );
};

export default SpaceShip2;
