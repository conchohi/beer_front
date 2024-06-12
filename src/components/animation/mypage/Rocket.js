import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./Rocket.json"

const RocketAnimation = () => {
  const unlockContainer = useRef()

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: unlockContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData
    });
    return () => instance.destroy()
  })
  return (
      <div ref={unlockContainer} style={{width:"15rem", height:"15rem"}}></div>
  )
}

export default RocketAnimation