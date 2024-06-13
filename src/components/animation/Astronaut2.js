import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./Astronaut2.json";

const Astronaut2 = () => {
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

  return <div ref={animationContainer} className="mx-auto" style={{ width: '70%', height: '70%' }} />;
};

export default Astronaut2;
