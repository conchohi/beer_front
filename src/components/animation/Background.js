import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./Background.json";

const Background = () => {
    const container = useRef(null);

    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData,
        });

        return () => {
            animation.destroy(); // Cleanup animation on unmount
        };
    }, []);

    return (
        <div
            ref={container}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                overflow: "hidden",
            }}
        />
    );
};

export default Background;
