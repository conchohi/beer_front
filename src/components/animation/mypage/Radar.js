import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./Radar.json"

const RadarAnimation = () => {
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
      <div ref={unlockContainer} style={{width:"100%", height:"100%"}}></div>
  )
}

export default RadarAnimation