import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./explode.json";

const Explode = () => {
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

  return <div ref={animationContainer} className="mx-auto" style={{ width: '50%', height: '50%' }} />;
};

export default  Explode;
