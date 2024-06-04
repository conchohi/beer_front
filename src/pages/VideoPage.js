import VideoComponent from "../components/test/VideoComponent";

const VideoPage = () => {
    return ( <>
        <div className="flex flex-col">
            <div className="flex flex-row gap-3 items-center justify-center my-4">
                <img className="h-20" src="/image/logo.png" alt="logo"/>
                <img className="h-12" src="/image/title.png" alt="title"/>
            </div>
            <VideoComponent/>
            
        </div>
    </> );
}
 
export default VideoPage;