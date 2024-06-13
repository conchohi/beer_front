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
      <div className="mx-auto" ref={unlockContainer} style={{width:"95%", height:"95%"}}></div>
  )
}

export default RadarAnimation