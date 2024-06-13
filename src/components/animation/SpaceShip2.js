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
      className="w-full"
      ref={animationContainer}
      style={{ width: "30vw", height: "40vw" }}
    />
  );
};

export default SpaceShip2;
