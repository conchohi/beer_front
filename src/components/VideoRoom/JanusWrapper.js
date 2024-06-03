import React, { useEffect, useRef, useState } from 'react';
import Janus from 'janus-gateway';
import adapter from 'webrtc-adapter'; // WebRTC adapter import
import LocalVideo from './LocalVideo';
import RemoteVideo from './RemoteVideo';

const JanusWrapper = ({ room, username }) => {
    const janus = useRef(null);
    const sfutest = useRef(null);
    const opaqueId = `videoroomtest-${Janus.randomString(12)}`;
    const [localStream, setLocalStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState([]);
    const [myid, setMyid] = useState(null);
    const [mypvtid, setMypvtid] = useState(null);

    // 설정된 dependencies를 저장합니다.
    const dependencies = Janus.useDefaultDependencies({ adapter: adapter });

    useEffect(() => {
        Janus.init({
            debug: "all",
            callback: startJanusSession
        });
    }, []);

    const startJanusSession = () => {
        janus.current = new Janus({
            server: "wss://janus.jsflux.co.kr/janus", // Use WebSocket URL
            dependencies: dependencies, // 설정된 dependencies 사용
            success: attachPlugin,
            error: (error) => console.error(error),
            destroyed: () => window.location.reload()
        });
    };

    const attachPlugin = () => {
        janus.current.attach({
            plugin: "janus.plugin.videoroom",
            opaqueId: opaqueId,
            success: (pluginHandle) => {
                sfutest.current = pluginHandle;
                registerUsername();
            },
            error: (error) => console.error("Error attaching plugin...", error),
            onmessage: onMessage,
            onlocalstream: (stream) => setLocalStream(stream),
            onremotestream: onRemoteStream,
            oncleanup: () => setLocalStream(null)
        });
    };

    const registerUsername = () => {
        const register = { request: "join", room: parseInt(room), ptype: "publisher", display: username };
        sfutest.current.send({ message: register });
    };

    const onMessage = (msg, jsep) => {
        const event = msg["videoroom"];
        if (event === "joined") {
            setMyid(msg["id"]);
            setMypvtid(msg["private_id"]);
            publishOwnFeed(true);
            if (msg["publishers"]) {
                const publishers = msg["publishers"];
                publishers.forEach(publisher => {
                    newRemoteFeed(publisher.id, publisher.display, publisher.audio_codec, publisher.video_codec);
                });
            }
        } else if (event === "event" && msg["publishers"]) {
            const publishers = msg["publishers"];
            publishers.forEach(publisher => {
                newRemoteFeed(publisher.id, publisher.display, publisher.audio_codec, publisher.video_codec);
            });
        }
        if (jsep) {
            sfutest.current.handleRemoteJsep({ jsep: jsep });
        }
    };

    const publishOwnFeed = (useAudio) => {
        sfutest.current.createOffer({
            media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: true },
            success: (jsep) => {
                const publish = { request: "configure", audio: useAudio, video: true };
                sfutest.current.send({ message: publish, jsep: jsep });
            },
            error: (error) => {
                console.error("WebRTC error:", error);
                if (useAudio) {
                    publishOwnFeed(false);
                }
            }
        });
    };

    const newRemoteFeed = (id, display, audio, video) => {
        janus.current.attach({
            plugin: "janus.plugin.videoroom",
            opaqueId: opaqueId,
            success: (pluginHandle) => {
                const remoteFeed = pluginHandle;
                const subscribe = {
                    request: "join",
                    room: parseInt(room),
                    ptype: "subscriber",
                    feed: id,
                    private_id: mypvtid
                };
                remoteFeed.send({ message: subscribe });
                remoteFeed.onmessage = onRemoteMessage;
                remoteFeed.onremotestream = (stream) => setRemoteStreams(prev => [...prev, stream]);
            },
            error: (error) => console.error("Error attaching plugin...", error)
        });
    };

    const onRemoteMessage = (msg, jsep) => {
        if (jsep) {
            sfutest.current.handleRemoteJsep({ jsep: jsep });
        }
    };

    const onRemoteStream = (stream) => {
        setRemoteStreams(prev => [...prev, stream]);
    };

    return (
        <div>
            <LocalVideo stream={localStream} />
            {remoteStreams.map((stream, index) => (
                <RemoteVideo key={index} stream={stream} />
            ))}
        </div>
    );
};

export default JanusWrapper;
