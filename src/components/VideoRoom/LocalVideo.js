import React, { useRef, useEffect } from 'react';

const LocalVideo = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return <video ref={videoRef} autoPlay muted />;
};

export default LocalVideo;
