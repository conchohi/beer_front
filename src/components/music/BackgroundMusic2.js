import React, { useRef, useState } from 'react';
import { MdMusicNote, MdMusicOff } from 'react-icons/md'; // MdMusicOff 아이콘 추가
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from 'react-icons/tb';

function BackgroundMusic2() {
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
        <source src="/music/background4.mp3" type="audio/mpeg" />
      </audio>
      <button onClick={handlePlayPause}>
        {isPlaying ? <TbPlayerPauseFilled className='w-10 h-10' /> : <TbPlayerPlayFilled className='w-10 h-10 ' />}
      </button>
    </div>
  );
}

export default BackgroundMusic2;
