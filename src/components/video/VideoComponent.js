import React, { useEffect, useRef, useState } from "react";
import Janus from "../../api/janus";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "spin.js";
import { FaMicrophoneAlt, FaMicrophoneAltSlash, FaRegUser, FaRegUserCircle, FaVideo, FaVideoSlash, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import DestoryRoomModal from "../Modal/room/DestoryRoomModal";
import DestoryCheckModal from "../Modal/room/DestroyCheckModal";
import UserDetail from "../../modal/UserDetail";
import Chat from "./Chat";

const server = "https://janus.jsflux.co.kr/janus";

var sfuClient = null
var janus = null

const VideoComponent = () => {
    //방에 최대 인원 수가 필요, 자신의 닉네임도 필요
    const {roomNo} = useParams();
    const myroom = Number(roomNo);

    const publisher = 6;
    const myVideoRef = useRef(null);
    const remoteFeedRef = useRef([]);
    const remoteVideoRef = useRef([]);

    //클라이언트와 서버 간의 연결을 식별하기 위한 고유한 식별자
    const opaqueId = "beer-" + Janus.randomString(12);
    //스트림 객체
    const [myStream, setMystream] = useState(null);

    //private Id
    const [pvtId, setPvtId] = useState("")

    //현재 음소거 상태
    const [muted, setMuted] = useState(false)

    //현재 화면 상태
    const [publish, setPublish] = useState(false);

    //현재 참여자
    const [feeds, setFeeds] = useState([]);

    //방 폭파 여부
    const [isDestory, setIsDestory] = useState(false);
    //방 폭파할지 확인하는 모달
    const [checkDestory, setCheckDestory] = useState(false);

        
    //유저 정보 모달
    const [userDetail, setUserDetail] = useState(false);
    //클릭한 사람의 닉네임
    const [clickUserNick, setClickUserNick] = useState("")

    const [nickname, setNickname] = useState("닉네임");
    const navigate = useNavigate();

    const [newFeed, setNewFeed] = useState(null);
    const [leaveId, setleaveId] = useState(null);

    const exitRoom = () => {
        janus.destroy();
        navigate("/chat/list"); //나가기 버튼 시 세션 삭제 및 이동
    }

    const destoryRoom = () => {
        var destroyRoom = {
            request: "destroy",
            room: myroom
        };
        sfuClient.send({ message: destroyRoom });

    }

    useEffect(() => {
        //들어가자마자 야누스 초기 설정
        Janus.init({
            debug: "all",
            callback: function () {
                //WebRTC 지원 여부 확인
                if (!Janus.isWebrtcSupported()) {
                    alert("No WebRTC support... ");
                    return;
                }
                //세션 생성
                janus = new Janus({
                    server: server,
                    success: function () {
                        //세션 생성 성공 시 해당 Janus 서버에 연결된 플러그인을 클라이언트에게 연결
                        janus.attach(
                            {
                                plugin: "janus.plugin.videoroom",
                                opaqueId: opaqueId,
                                success: function (pluginHandle) {
                                    //플러그인 등록!
                                    sfuClient = pluginHandle;
                                    Janus.log("Plugin attached! (" + sfuClient.getPlugin() + ", id=" + sfuClient.getId() + ")");
                                    Janus.log("  -- This is a publisher/manager");

                                    //방 생성
                                    var createRoom = {
                                        request: "create",
                                        room: myroom,
                                        permanent: false,
                                        record: false,
                                        publishers: publisher, //방에 들어갈 수 있는 인원 수, 차후 수정
                                        bitrate: 16000000,
                                        fir_freq: 10,
                                        ptype: "publisher",
                                        description: "test",
                                        is_private: false
                                    }

                                    sfuClient.send({
                                        message: createRoom,
                                        success: function (result) {
                                            var event = result["videoroom"];
                                            Janus.debug("Event: " + event);
                                            if (event != undefined && event != null) {
                                                // Our own screen sharing session has been created, join it
                                                console.log("Room Create Result: " + result);
                                                console.log("error: " + result["error"]);
                                                console.log("Screen sharing session created: " + result["room"]);
                                                //성공 시 Join, 방 번호와 닉네임으로 들어감
                                                var register = { "request": "join", "room": myroom, "ptype": "publisher", "display": nickname };
                                                sfuClient.send({ "message": register });
                                            }
                                        }
                                    });

                                },
                                error: function (error) {
                                    Janus.error("  -- Error attaching plugin...", error);
                                    alert("Error attaching plugin... " + error)
                                },
                                //미디어 장치 접근 권한을 요청할 때 나타나는 동의 대화 상자와 관련된 상태를 처리	
                                consentDialog: function (on) {
                                    Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
                                },
                                //원격 피어로부터 미디어 트랙(오디오 또는 비디오)의 상태 변화를 처리
                                mediaState: function (medium, on) {
                                    Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
                                },
                                //전체 WebRTC 연결 상태 변화를 처리합니다.
                                //연결 성공 시 보여줄 화면 넣을 수 있음
                                webrtcState: function (on) {
                                    Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
                                    // setLoading(!on);
                                    // if (!on)
                                    //     return;
                                    //setRtcConnection(on) 이런식으로
                                },
                                //화상채팅에서 발생하는 다양한 이벤트 처리 방법
                                //msg 객체는 Janus 서버에서 수신된 메시지
                                onmessage: function (msg, jsep) {
                                    Janus.debug(" ::: Got a message (publisher) :::", msg);
                                    //이벤트 식별
                                    var event = msg["videoroom"];
                                    Janus.debug("Event: " + event);
                                    if (event) {
                                        //사용자가 비디오룸에 성공적으로 참여
                                        if (event === "joined") {
                                            //개인 ID
                                            setPvtId(msg["private_id"]);

                                            Janus.log("Successfully joined room " + msg["room"] + " with ID " + msg["id"]);

                                            setPublish(true);

                                            //Janus에서 서버로부터 수신된 메시지에서 발송자(publisher) 목록을 나타냄
                                            if (msg["publishers"]) {
                                                let list = msg["publishers"];
                                                Janus.debug("Got a list of available publishers/feeds:", list);
                                                for (let f in list) {
                                                    let id = list[f]["id"];
                                                    let display = list[f]["display"];
                                                    let audio = list[f]["audio_codec"];
                                                    let video = list[f]["video_codec"];
                                                    Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
                                                    newRemoteFeed(id, display, audio, video);
                                                }
                                            }
                                            //방 삭제 시 처리할 항목
                                        } else if (event === "destroyed") {
                                            Janus.warn("The room has been destroyed!");
                                            //모달로 방이 폭파되었다는 모달을 띄우고 navigate 시키면 될 듯?
                                            setIsDestory(true)
                                            //그 외 다양한 이벤트 처리
                                        } else if (event === "event") {
                                            //Janus에서 서버로부터 수신된 메시지에서 발송자(publisher) 목록을 나타냄
                                            if (msg["publishers"]) {
                                                let list = msg["publishers"];
                                                Janus.debug("Got a list of available publishers/feeds:", list);
                                                for (let f in list) {
                                                    let id = list[f]["id"];
                                                    let display = list[f]["display"];
                                                    let audio = list[f]["audio_codec"];
                                                    let video = list[f]["video_codec"];
                                                    Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
                                                    newRemoteFeed(id, display, audio, video);
                                                }
                                                //특정 발송자가 방송에서 퇴장했음을 나타내는 데 사용
                                            } else if (msg["leaving"]) {
                                                var leaving = msg["leaving"];
                                                Janus.log("Publisher left: " + leaving);
                                                setleaveId(leaving)

                                                // 발송자가 발행한 스트림이 중지되었음을 나타내는 이벤트, 방송을 중지했을 때 발생
                                            } else if (msg["unpublished"]) {
                                                // One of the publishers has unpublished?
                                                var unpublished = msg["unpublished"];
                                                Janus.log("Publisher unpublished: " + unpublished);
                                                if (unpublished === 'ok') {
                                                    //내 화면이 unpublished라면 hangup
                                                    sfuClient.hangup();
                                                    return;
                                                }
                                                setleaveId(unpublished);
                                            } else if (msg["error"]) {
                                                if (msg["error_code"] === 426) {
                                                    // This is a "no such room" error: give a more meaningful description
                                                    alert(
                                                        "<p>Apparently room <code>" + myroom + "</code> (the one this demo uses as a test room) " +
                                                        "does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> " +
                                                        "configuration file? If not, make sure you copy the details of room <code>" + myroom + "</code> " +
                                                        "from that sample in your current configuration file, then restart Janus and try again."
                                                    );
                                                } else {
                                                    alert(msg["error"]);
                                                }
                                            }
                                        }
                                    }
                                    if (jsep) {
                                        Janus.debug("Handling SDP as well...", jsep);
                                        sfuClient.handleRemoteJsep({ jsep: jsep });
                                        // Check if any of the media we wanted to publish has
                                        // been rejected (e.g., wrong or unsupported codec)
                                        var audio = msg["audio_codec"];
                                        if (myStream && myStream.getAudioTracks() && myStream.getAudioTracks().length > 0 && !audio) {
                                            // Audio has been rejected
                                            alert("Our audio stream has been rejected, viewers won't hear us");
                                        }
                                        var video = msg["video_codec"];
                                        if (myStream && myStream.getVideoTracks() && myStream.getVideoTracks().length > 0 && !video) {
                                            // Video has been rejected
                                            alert.warning("Our video stream has been rejected, viewers won't see us");
                                            // Hide the webcam video
                                            // $('#myvideo').hide();
                                            // $('#videolocal').append(
                                            //     '<div class="no-video-container">' +
                                            //     '<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
                                            //     '<span class="no-video-text" style="font-size: 16px;">Video rejected, no webcam</span>' +
                                            //     '</div>');
                                        }
                                    }
                                },
                                onlocalstream: function (stream) {
                                    Janus.debug(" ::: Got a local stream :::", stream);
                                    //stream 설정 시 useEffect 실행
                                    setMystream(stream)

                                    // if (sfuClient.webrtcStuff.pc.iceConnectionState !== "completed" &&
                                    //     sfuClient.webrtcStuff.pc.iceConnectionState !== "connected") {
                                    //     setPublish(false)
                                    // }
                                    // var videoTracks = stream.getVideoTracks();

                                    // if (!videoTracks || videoTracks.length === 0) {
                                    //     setPublish(false)
                                    // }
                                },
                                onremotestream: function (stream) {
                                    // The publisher stream is sendonly, we don't expect anything here
                                },
                                oncleanup: function () {
                                    Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
                                    setMystream(null)
                                    setPublish(null)
                                }
                            })
                    },
                    error: function (error) {
                        Janus.error(error);
                        alert(error)
                    },
                    destroyed: function () {
                        setIsDestory(true);
                    }
                })
            }
        })


        // 페이지 닫을 때 자동으로 종료
        return () => {
            if (sfuClient) {
                sfuClient.detach()
            }
            if (janus) {
                janus.destroy({
                    success: function () {
                        console.log("Janus instance destroyed successfully");
                        janus = null; // 인스턴스를 null로 설정하여 메모리에서 해제
                    },
                    error: function (error) {
                        console.error("Error destroying Janus instance", error);
                    }
                });
            }
        }
    }, [])

    //내 비디오 연결
    useEffect(() => {
        const attachStreamToVideo = async () => {
            try {
                if (myVideoRef.current && myStream) {
                    if ('srcObject' in myVideoRef.current) {
                        myVideoRef.current.srcObject = myStream;
                    } else {
                        myVideoRef.current.src = URL.createObjectURL(myStream);
                    }
                }
            } catch (error) {
                console.error("Error attaching stream to element:", error);
            }
        };
        attachStreamToVideo();

    }, [myStream]);

    useEffect(() => {
        if (publish) {
            publishOwnFeed(true)
        }
    }, [publish])

    useEffect(() => {
        //새로운 피드가 들어오면 시작
        if (!newFeed) {
            return;
        }
        const updatedFeeds = [...feeds];
        for (let i = 1; i < publisher; i++) {
            if (!updatedFeeds[i]) {
                // 리모트 피드를 추가
                updatedFeeds[i] = newFeed;
                newFeed.rfindex = i;
                // 상태를 업데이트하고 함수 종료
                setFeeds(updatedFeeds);
                break;
            }
        }
    }, [newFeed])

    useEffect(() => {
        if (!leaveId) {
            return;
        }
        let remoteFeed = null;
        for (var i = 1; i < publisher; i++) {
            if (feeds[i] && feeds[i].rfid == leaveId) {
                remoteFeed = feeds[i];
                break;
            }
        }
        if (remoteFeed != null) {
            Janus.debug("Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching");
            remoteVideoRef.current[remoteFeed.rfindex].srcObject = null;
            const updatedFeeds = [...feeds];
            updatedFeeds.splice(remoteFeed.rfindex, 1);
            setFeeds(updatedFeeds);
            remoteFeed.detach();
        }
        setleaveId(null)

    }, [leaveId])


    useEffect(() => {
        feeds.forEach(feed => {
            if (!feed) {
                return;
            }
            const videoElement = remoteVideoRef.current[feed.rfindex];

            videoElement.addEventListener('playing', () => {
                if (feed.spinner)
                    feed.spinner.stop();
                feed.spinner = null;
            })


            try {
                if (remoteVideoRef.current[feed.rfindex] && feed.stream) {
                    if ('srcObject' in remoteVideoRef.current[feed.rfindex]) {
                        remoteVideoRef.current[feed.rfindex].srcObject = feed.stream;
                    } else {
                        remoteVideoRef.current[feed.rfindex].src = URL.createObjectURL(feed.stream);
                    }
                }
            } catch (error) {
                console.error("Error attaching stream to element:", error);
            }

        })
    }, [feeds])

    useEffect(()=>{
        if(clickUserNick){
            setUserDetail(true)
        }
    }, [clickUserNick])

    //[jsflux] 내 화상화면 시작, 다른 사용자에게 보내주는 역할
    const publishOwnFeed = (useAudio) => {
        //WebRTC 연결하는데 사용
        sfuClient.createOffer({
            //오디오 및 비디오를 받지 않고 오디오 및 비디오를 전송하겠다는 의미
            //사용자는 보내기만 함
            media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: true },	// Publishers are sendonly
            //여러 가지 품질의 비디오 스트림을 동시에 전송하여 네트워크 조건에 따라 가장 적합한 스트림을 선택할 수 있게 하는 기능
            simulcast: true,
            simulcast2: false,
            success: function (jsep) {
                Janus.debug("Got publisher SDP!", jsep);
                const publish = { request: "configure", audio: useAudio, video: true };
                sfuClient.send({ message: publish, jsep: jsep });
            },
            error: function (error) {
                Janus.error("WebRTC error:", error);
                //에러 시 오디오를 true로 해놨다면 오디오를 사용하지 않는 방식으로 재귀
                if (useAudio) {
                    publishOwnFeed(false);
                } else {
                    alert("WebRTC error... " + error.message);
                }
            }
        });
    }



    // [jsflux] 음소거
    function toggleMute() {
        Janus.log((muted ? "Unmuting" : "Muting") + " local stream...");
        if (muted)
            sfuClient.unmuteAudio();
        else
            sfuClient.muteAudio();
        setMuted(sfuClient.isAudioMuted())
    }

    // [jsflux] 화면 끄기
    function unpublishOwnFeed() {
        setPublish(false)
        var unpublish = { request: "unpublish" };
        sfuClient.send({ message: unpublish });
    }

    // [jsflux] 새로운 유저 들어왔을때
    function newRemoteFeed(id, display, audio, video) {
        var remoteFeed = null;
        janus.attach(
            {
                plugin: "janus.plugin.videoroom",
                opaqueId: opaqueId,
                success: function (pluginHandle) {
                    remoteFeed = pluginHandle;
                    remoteFeed.simulcastStarted = true;
                    Janus.log("Plugin attached! (" + remoteFeed.getPlugin() + ", id=" + remoteFeed.getId() + ")");
                    Janus.log("  -- This is a subscriber");
                    //"join"을 사용하여 구독 요청을 생성
                    var subscribe = {
                        request: "join",
                        room: myroom,
                        ptype: "subscriber",
                        feed: id,
                        private_id: Number(pvtId)
                    };
                    // 브라우저가 Safari이고 퍼블리셔가 지원하지 않는 코덱을 사용하는 경우 비디오를 비활성화하는 부분도 처리
                    if (Janus.webRTCAdapter.browserDetails.browser === "safari" &&
                        (video === "vp9" || (video === "vp8" && !Janus.safariVp8))) {
                        if (video)
                            video = video.toUpperCase()
                        alert.warning("Publisher is using " + video + ", but Safari doesn't support it: disabling video");
                        subscribe["offer_video"] = false;
                    }
                    remoteFeed.videoCodec = video;
                    remoteFeed.send({ message: subscribe });
                },
                error: function (error) {
                    Janus.error("  -- Error attaching plugin...", error);
                    alert("Error attaching plugin... " + error);
                },
                onmessage: function (msg, jsep) {
                    Janus.debug(" ::: Got a message (subscriber) :::", msg);
                    var event = msg["videoroom"];
                    Janus.debug("Event: " + event);
                    if (msg["error"]) {
                        alert(msg["error"]);
                    } else if (event) {
                        //구독자가 특정 피드에 성공적으로 연결되었음을 나타냄
                        if (event === "attached") {
                            //원격 피드
                            remoteFeed.rfid = msg["id"];
                            //사용자 이름
                            remoteFeed.rfdisplay = msg["display"];

                            if (!remoteFeed.spinner) {
                                const target = remoteFeedRef.current[remoteFeed.rfindex]
                                remoteFeed.spinner = new Spinner({ top: 100 }).spin(target);
                            } else {
                                remoteFeed.spinner.spin();
                            }
                            setNewFeed(remoteFeed)
                            Janus.log("Successfully attached to feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") in room " + msg["room"]);
                        }
                    }
                    if (jsep) {
                        Janus.debug("Handling SDP as well...", jsep);
                        // 로컬 미디어 스트림을 수신하기 위한 응답을 생성
                        remoteFeed.createAnswer(
                            {
                                jsep: jsep,
                                //오디오랑 비디오 수신만
                                media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
                                success: function (jsep) {
                                    Janus.debug("Got SDP!", jsep);
                                    var body = { request: "start", room: myroom };
                                    remoteFeed.send({ message: body, jsep: jsep });
                                },
                                error: function (error) {
                                    Janus.error("WebRTC error:", error);
                                    alert("WebRTC error... " + error.message);
                                }
                            });
                    }
                },
                iceState: function (state) {
                    Janus.log("ICE state of this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") changed to " + state);
                },
                webrtcState: function (on) {
                    Janus.log("Janus says this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") is " + (on ? "up" : "down") + " now");
                },
                onlocalstream: function (stream) {
                    // The subscriber stream is recvonly, we don't expect anything here
                },
                onremotestream: function (stream) {
                    Janus.debug("Remote feed #" + remoteFeed.rfindex + ", stream:", stream);
                    remoteFeed.stream = stream;
                    try {
                        if (remoteVideoRef.current[remoteFeed.rfindex] && stream) {
                            if ('srcObject' in remoteVideoRef.current[remoteFeed.rfindex]) {
                                remoteVideoRef.current[remoteFeed.rfindex].srcObject = stream;
                            } else {
                                remoteVideoRef.current[remoteFeed.rfindex].src = URL.createObjectURL(stream);
                            }
                        }
                    } catch (error) {
                        console.error("Error attaching stream to element:", error);
                    }
                },
                oncleanup: function () {
                    Janus.log(" ::: Got a cleanup notification (remote feed " + id + ") :::");
                    if (remoteFeed.spinner)
                        remoteFeed.spinner.stop();
                    remoteFeed.spinner = null;
                }
            });
    }




    return (<>
        <div className="w-full flex flex-row flex-wrap ">
            {/* 방 폭파 확인 모달 */}
            {checkDestory && <DestoryCheckModal setCheckDestroy={setCheckDestory} destroy={destoryRoom}/>}
            {/* 방 폭파 모달 */}
            {isDestory && <DestoryRoomModal/>}
            {/* 회원 정보 모달 */}
            {userDetail && <UserDetail nickname={clickUserNick} close={()=>{
                setClickUserNick(""); 
                setUserDetail(false);}
                }/>}
            <div className="w-full font-bold text-3xl text-white mb-2 ms-40 ">캔맥들고 모여</div>
            <div className="w-1/12 flex flex-col gap-5 text-white mt-4">
                <button onClick={toggleMute}>{muted ?
                    <div className="flex flex-col justify-center items-center text-center"><FaMicrophoneAltSlash color="white" size="40" /><span>음소거 해제</span></div>
                    : <div className="flex flex-col justify-center items-center text-center"><FaMicrophoneAlt color="white" size="40" /><span>음소거</span></div>}
                </button>
                <button onClick={publish ? unpublishOwnFeed : () => { setPublish(true) }}>{publish ?
                    <div className="flex flex-col justify-center items-center text-center"><FaVideoSlash color="white" size="40" /><span>비디오 종료</span></div>
                    : <div className="flex flex-col justify-center items-center text-center"><FaVideo color="white" size="40" /><span>비디오 시작</span></div>}


                </button>
            </div>
            <div className="w-5/6 flex flex-row flex-wrap ">
                <div className={"flex flex-col justify-center rounded-lg items-center text-center p-4 " + (publisher <= 4 ? "w-1/2" : "w-1/3")}>
                    <div className="w-full  bg-black border-2 border-white rounded-xl">
                        <div className="relative">
                        <video ref={myVideoRef} id="myvideo" className="w-full h-full box-border p-3" autoPlay playsInline muted />
                        <span className="absolute bottom-6 right-6 cursor-pointer" onClick={()=>{setClickUserNick(nickname)}}><FaUserLarge size="40" /></span>
                    </div>
                    <span className="font-bold text-xl py-3 text-white" >{nickname}</span>
                    </div>

                </div>

                {feeds.map((feed) => {
                    if (feed === feeds[0]) {
                        return;
                    }

                    return (
                        <div ref={(el) => remoteFeedRef.current[feed.rfindex] = el} className={"flex flex-col justify-center items-center text-center p-6 " + (publisher <= 4 ? "w-1/2" : "w-1/3")}>
                            <div className="w-full  bg-black border-2 border-white rounded-xl">
                            <div className="relative">
                                <video ref={(el) => remoteVideoRef.current[feed.rfindex] = el} className="w-full h-full box-border p-3" autoPlay playsInline/>
                                <span className="absolute bottom-6 right-6 cursor-pointer" onClick={()=>{setClickUserNick(feed?.rfdisplay)}}><FaUserLarge size="40" /></span>
                            </div>
                            <span className="font-bold text-lg py-3 text-white">{feed?.rfdisplay}</span>
                        </div>
                        </div>
                    )

                })}
            </div>
        </div>
        <div className="flex w-5/6 mx-auto mt-12">
           <Chat roomId={roomNo} />
      
            <div className="w-1/4 flex flex-col items-center gap-5 ps-5 text-lg font-bold">
                <button className="w-full py-5 bg-gray-600 text-white">게임 선택</button>
                <button className="w-full py-5 bg-[#BE2222] text-white" onClick={exitRoom}>나가기</button>
                <button className="w-full py-5 bg-white" onClick={()=>{setCheckDestory(true)}}>방 폭파</button>
            </div>
        </div>
    </>);
}

export default VideoComponent;