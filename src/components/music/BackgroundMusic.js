import { useRef, useState } from 'react';
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from 'react-icons/tb';

function BackgroundMusic() {
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
        <source src="/music/background5.mp3" type="audio/mpeg" />
      </audio>
      <button onClick={handlePlayPause}>
        {isPlaying ? <TbPlayerPauseFilled className='w-8 h-8 text-white' /> : <TbPlayerPlayFilled className='w-8 h-6 text-white' />}
      </button>
    </div>
  );
}

export default BackgroundMusic;
