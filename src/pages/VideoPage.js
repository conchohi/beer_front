import VideoComponent from "../components/video/VideoComponent";
import VideoComponentV2 from "../components/video/VideoComponentV2";

const VideoPage = () => {
    return ( <>
        <div className="flex flex-col">
            <div className="flex flex-row gap-3 items-center justify-center mt-4">
                <img className="h-20" src="/img/logo.png" alt="logo"/>
                <img className="h-12" src="/img/title.png" alt="title"/>
            </div>
            <VideoComponent/>
            
        </div>
    </> );
}
 
export default VideoPage;