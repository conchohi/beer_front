import { FaMicrophoneAlt, FaMicrophoneAltSlash, FaVideo, FaVideoSlash, } from "react-icons/fa";
const VideoButton = ({toggleMute, muted, publish, publishOwnFeed, unpublishOwnFeed}) => {
    return (
        <><button onClick={toggleMute}>{muted ?
            <div className="flex flex-col justify-center items-center text-center"><FaMicrophoneAltSlash color="white" size="40" /><span>음소거 해제</span></div>
            : <div className="flex flex-col justify-center items-center text-center"><FaMicrophoneAlt color="white" size="40" /><span>음소거</span></div>}
        </button>
            <button onClick={() => { publish ? unpublishOwnFeed() : publishOwnFeed(true) }}>{publish ?
                <div className="flex flex-col justify-center items-center text-center"><FaVideoSlash color="white" size="40" /><span>비디오 종료</span></div>
                : <div className="flex flex-col justify-center items-center text-center"><FaVideo color="white" size="40" /><span>비디오 시작</span></div>}


            </button>
        </>);
}

export default VideoButton;