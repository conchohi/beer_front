import React, { useRef, useState } from 'react';


function BackgroundMusic3() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="/music/background7.mp3" type="audio/mpeg" />
      </audio>
      <button onClick={handlePlayPause}>
        　
      </button>
    </div>
  );
}

export default BackgroundMusic3;
