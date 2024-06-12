import VideoComponent from "../components/video/VideoComponent";
import VideoComponentV2 from "../components/video/VideoComponentV2";
import VideoComponentV3 from "../components/video/VideoComponentV3";

const VideoPage = () => {
    return ( <>
        <div className="flex flex-col">
            <div className="flex flex-row gap-3 items-center justify-center mt-4">
                <img className="h-20" src="/img/logo.png" alt="logo"/>
                <img className="h-12" src="/img/title.png" alt="title"/>
            </div>
            <VideoComponentV3/>
            
        </div>
    </> );
}
 
export default VideoPage;