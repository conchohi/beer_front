// import { FaUserLarge } from "react-icons/fa6";
// import DestoryCheckModal from "./modal/room/DestroyCheckModal";
// import UserDetail from "./modal/UserDetail";
// import Chat from "./Chat";
// import { destoryRoom, exit, getParticipantList, getRoom, join } from "../../api/roomApi";
// import BasicModalComponent from "../common/BasicModalComponent";
// import GameSelectModal from "./modal/game/GameSelectModal";
// import ParticipantList from "./ParticipantList";
// import VideoButton from "./VideoButton";

// const server = "https://janus.jsflux.co.kr/janus";

// var sfuClient = null
// var janus = null

// const VideoComponentV2 = () => {
//     //방에 최대 인원 수가 필요, 자신의 닉네임도 필요
//     const { roomNo } = useParams();
//     const myroom = Number(roomNo);

//     const myVideoRef = useRef(null);
//     const remoteVideoRef = useRef([]);

//     //클라이언트와 서버 간의 연결을 식별하기 위한 고유한 식별자
//     const opaqueId = "beer-" + Janus.randomString(12);

//     //방 제목
//     const [title, setTitle] = useState("")

//     //스트림 객체
//     const [myStream, setMystream] = useState(null);

//     //private Id
//     const [pvtId, setPvtId] = useState("")

//     //현재 음소거 상태
//     const [muted, setMuted] = useState(false)

//     //현재 화면 상태
//     const [publish, setPublish] = useState(false);

//     //현재 참여자
//     const [feeds, setFeeds] = useState([]);
//     const [participantList, setParticipantList] = useState([]);

//     //방 폭파할지 확인하는 모달
//     const [checkDestory, setCheckDestory] = useState(false);

//     //게임 선택 모달
//     const [openGame, setOpenGame] = useState(false);

//     //메세지 모달 관련
//     const [message, setMessage] = useState("");
//     const [openModal, setOpenModal] = useState(false);

//     //유저 정보 모달
//     const [userDetail, setUserDetail] = useState(false);

//     //클릭한 사람의 닉네임
//     const [clickUserNick, setClickUserNick] = useState("")

//     //본인의 닉네임(로컬 스토리지로 저장 후 해당 닉네임 사용)
//     const nickname = localStorage.getItem("nickname")

//     //방장
//     const [master, setMaster] = useState("");

//     const [newFeed, setNewFeed] = useState(null);
//     const [leaveId, setleaveId] = useState(null);

//     const navigate = useNavigate();

//     const clickExitRoom = () => {

//         navigate("/chat/list"); //나가기 버튼 시 세션 삭제 및 이동
//     }

//     //방 폭파 버튼 클릭
//     const clickDestoryRoom = () => {
//         if (master == nickname) {
//             setCheckDestory(true);
//         } else {
//             setMessage("방장만 선택 가능합니다.")
//             setOpenModal(true)
//         }
//     }

//     //방 폭파
//     const destory = () => {
//         setCheckDestory(false);
//         destoryRoom(roomNo).then(result => {
//             let destroyMessage = {
//                 request: "destroy",
//                 room: myroom
//             };
//             sfuClient.send({ message: destroyMessage });
//         })
//     }

//     //게임 선택 클릭
//     const clickGame = () => {
//         //방장만 게임 선택 가능
//         if (master == nickname) {
//             setOpenGame(true);
//         } else {
//             setMessage("방장만 선택 가능합니다.")
//             setOpenModal(true)
//         }
//     }

//     //단순 메세지의 경우 모달만 닫고 에러 메세지 일 경우 list 페이지로 이동
//     const basicModalClose = () => {
//         if (message === "방장만 선택 가능합니다.") {
//             setOpenModal(false)
//         } else if (message === "로그인 후 이용 가능합니다.") {
//             navigate('/login')
//         }
//         else {
//             navigate('/chat/list')
//         }
//     }


//     useEffect(() => {
//         if (!nickname) {
//             setMessage('로그인 후 이용 가능합니다.')
//             setOpenModal(true)
//             return;
//         }
//         //방에 입장
//         join(roomNo).then(
//             //방에 대한 정보를 가져옴
//             getRoom(roomNo).then(result => {
//                 //참여자 정보 ( 자신의 닉네임 제외 )
//                 setParticipantList(result.participantList)
//                 //방 제목
//                 setTitle(result.title)
//                 //방장
//                 setMaster(result.master || nickname)

//                 //입장 성공 시 야누스 초기 설정
//                 Janus.init({
//                     debug: "all",
//                     callback: function () {
//                         //WebRTC 지원 여부 확인
//                         if (!Janus.isWebrtcSupported()) {
//                             alert("No WebRTC support... ");
//                             return;
//                         }
//                         //세션 생성
//                         janus = new Janus({
//                             server: server,
//                             success: function () {
//                                 //세션 생성 성공 시 해당 Janus 서버에 연결된 플러그인을 클라이언트에게 연결
//                                 janus.attach(
//                                     {
//                                         plugin: "janus.plugin.videoroom",
//                                         opaqueId: opaqueId,
//                                         success: function (pluginHandle) {
//                                             //플러그인 등록!
//                                             sfuClient = pluginHandle;
//                                             Janus.log("Plugin attached! (" + sfuClient.getPlugin() + ", id=" + sfuClient.getId() + ")");
//                                             Janus.log("  -- This is a publisher/manager");

//                                             //방 생성
//                                             let createRoom = {
//                                                 request: "create",
//                                                 room: myroom,
//                                                 permanent: false,
//                                                 record: false,
//                                                 publishers: result.maximumUser, //방에 들어갈 수 있는 인원 수
//                                                 bitrate: 16000000,
//                                                 fir_freq: 10,
//                                                 ptype: "publisher",
//                                                 description: "test",
//                                                 is_private: false
//                                             }

//                                             sfuClient.send({
//                                                 message: createRoom,
//                                                 success: function (result) {
//                                                     let event = result["videoroom"];
//                                                     Janus.debug("Event: " + event);
//                                                     if (event != undefined && event != null) {
//                                                         // Our own screen sharing session has been created, join it
//                                                         console.log("Room Create Result: " + result);
//                                                         console.log("error: " + result["error"]);
//                                                         console.log("Screen sharing session created: " + result["room"]);
//                                                         //성공 시 Join, 방 번호와 닉네임으로 들어감
//                                                         let register = { "request": "join", "room": myroom, "ptype": "publisher", "display": nickname };
//                                                         sfuClient.send({ "message": register });
//                                                     }
//                                                 }
//                                             });

//                                         },
//                                         error: function (error) {
//                                             Janus.error("  -- Error attaching plugin...", error);
//                                             alert("Error attaching plugin... " + error)
//                                         },
//                                         //미디어 장치 접근 권한을 요청할 때 나타나는 동의 대화 상자와 관련된 상태를 처리	
//                                         consentDialog: function (on) {
//                                             Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
//                                         },
//                                         //원격 피어로부터 미디어 트랙(오디오 또는 비디오)의 상태 변화를 처리
//                                         mediaState: function (medium, on) {
//                                             Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
//                                         },
//                                         //전체 WebRTC 연결 상태 변화를 처리합니다.
//                                         //연결 성공 시 보여줄 화면 넣을 수 있음
//                                         webrtcState: function (on) {
//                                             Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
//                                         },
//                                         //화상채팅에서 발생하는 다양한 이벤트 처리 방법
//                                         //msg 객체는 Janus 서버에서 수신된 메시지
//                                         onmessage: function (msg, jsep) {
//                                             Janus.debug(" ::: Got a message (publisher) :::", msg);
//                                             //이벤트 식별
//                                             var event = msg["videoroom"];
//                                             Janus.debug("Event: " + event);
//                                             if (event) {
//                                                 //사용자가 비디오룸에 성공적으로 참여
//                                                 if (event === "joined") {
//                                                     //개인 ID
//                                                     setPvtId(msg["private_id"]);

//                                                     Janus.log("Successfully joined room " + msg["room"] + " with ID " + msg["id"]);

//                                                     publishOwnFeed(true);

//                                                     //Janus에서 서버로부터 수신된 메시지에서 발송자(publisher) 목록을 나타냄
//                                                     if (msg["publishers"]) {
//                                                         getParticipantList(roomNo).then(result => {
//                                                             setParticipantList(result);

//                                                             let list = msg["publishers"];
//                                                             Janus.debug("Got a list of available publishers/feeds:", list);
//                                                             for (let f in list) {
//                                                                 let id = list[f]["id"];
//                                                                 let display = list[f]["display"];
//                                                                 let audio = list[f]["audio_codec"];
//                                                                 let video = list[f]["video_codec"];
//                                                                 Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
//                                                                 newRemoteFeed(id, display, audio, video);
//                                                             }
//                                                         }).catch((error) => {
//                                                             console.log(error)
//                                                         })
//                                                     }
//                                                     //방 삭제 시 처리할 항목
//                                                 } else if (event === "destroyed") {
//                                                     Janus.warn("The room has been destroyed!");
//                                                     //모달로 방이 폭파되었다는 모달을 띄움
//                                                     setMessage('방장에 의해 화상채팅이 \n  종료 되었습니다.')
//                                                     setOpenModal(true)
//                                                     //그 외 다양한 이벤트 처리
//                                                 } else if (event === "event") {
//                                                     //Janus에서 서버로부터 수신된 메시지에서 발송자(publisher) 목록을 나타냄
//                                                     if (msg["publishers"]) {
//                                                         getRoom(roomNo).then(result => {
//                                                             setParticipantList(result.participantList);
//                                                             let list = msg["publishers"];
//                                                             Janus.debug("Got a list of available publishers/feeds:", list);
//                                                             for (let f in list) {
//                                                                 let id = list[f]["id"];
//                                                                 let display = list[f]["display"];
//                                                                 let audio = list[f]["audio_codec"];
//                                                                 let video = list[f]["video_codec"];
//                                                                 Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
//                                                                 newRemoteFeed(id, display, audio, video);
//                                                             }
//                                                         }).catch((error) => {
//                                                             console.log(error)
//                                                         })
//                                                         //특정 발송자가 방송에서 퇴장했음을 나타내는 데 사용
//                                                     } else if (msg["leaving"]) {
//                                                         getParticipantList(roomNo).then(result => {
//                                                             setParticipantList(result)
//                                                             //방장
//                                                             setMaster(result.master)
//                                                             var leaving = msg["leaving"];
//                                                             Janus.log("Publisher left: " + leaving);

//                                                             setleaveId(leaving)
//                                                         })
//                                                         // 발송자가 발행한 스트림이 중지되었음을 나타내는 이벤트, 방송을 중지했을 때 발생
//                                                     } else if (msg["unpublished"]) {
//                                                         // One of the publishers has unpublished?
//                                                         var unpublished = msg["unpublished"];
//                                                         Janus.log("Publisher unpublished: " + unpublished);
//                                                         if (unpublished === 'ok') {
//                                                             //내 화면이 unpublished라면 hangup
//                                                             sfuClient.hangup();
//                                                             return;
//                                                         }
//                                                         setleaveId(unpublished)
//                                                     } else if (msg["error"]) {
//                                                         if (msg["error_code"] === 426) {
//                                                             // This is a "no such room" error: give a more meaningful description
//                                                             alert(
//                                                                 "<p>Apparently room <code>" + myroom + "</code> (the one this demo uses as a test room) " +
//                                                                 "does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> " +
//                                                                 "configuration file? If not, make sure you copy the details of room <code>" + myroom + "</code> " +
//                                                                 "from that sample in your current configuration file, then restart Janus and try again."
//                                                             );
//                                                         } else {
//                                                             alert(msg["error"]);
//                                                         }
//                                                     }
//                                                 }
//                                             }
//                                             if (jsep) {
//                                                 Janus.debug("Handling SDP as well...", jsep);
//                                                 sfuClient.handleRemoteJsep({ jsep: jsep });
//                                                 // Check if any of the media we wanted to publish has
//                                                 // been rejected (e.g., wrong or unsupported codec)
//                                                 var audio = msg["audio_codec"];
//                                                 if (myStream && myStream.getAudioTracks() && myStream.getAudioTracks().length > 0 && !audio) {
//                                                     // Audio has been rejected
//                                                     alert("Our audio stream has been rejected, viewers won't hear us");
//                                                 }
//                                                 var video = msg["video_codec"];
//                                                 if (myStream && myStream.getVideoTracks() && myStream.getVideoTracks().length > 0 && !video) {
//                                                     // Video has been rejected
//                                                     alert("Our video stream has been rejected, viewers won't see us");
//                                                 }
//                                             }
//                                         },
//                                         onlocalstream: function (stream) {
//                                             Janus.debug(" ::: Got a local stream :::", stream);
//                                             //stream 설정 시 useEffect 실행
//                                             setMystream(stream)
//                                         },
//                                         onremotestream: function (stream) {
//                                             // The publisher stream is sendonly, we don't expect anything here
//                                         },
//                                         oncleanup: function () {
//                                             Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
//                                             setMystream(null)
//                                             setPublish(null)
//                                         }
//                                     })
//                             },
//                             error: function (error) {
//                                 Janus.error(error);
//                                 alert(error)
//                             },
//                             destroyed: function () {
//                                 setMessage('방장에 의해 화상채팅이 \n 종료 되었습니다.')
//                                 setOpenModal(true)
//                             }
//                         })
//                     }
//                 })

//             }).catch(error => {
//                 setMessage(error.response.data.message)
//             })
//         ).catch(error => {
//             //방이 존재하지 않거나, 이미 꽉찼을 경우
//             setMessage(error.response.data.message);
//             setOpenModal(true)
//             return;
//         })


//         // 페이지 닫을 때 자동으로 종료
//         return () => {
//             //서버에 나간 기록 전송
//             exit(roomNo).then(result => {
//                 if (sfuClient) {
//                     sfuClient.detach()
//                 }
//                 if (janus) {
//                     janus.destroy({
//                         success: function () {
//                             console.log("Janus instance destroyed successfully");
//                             janus = null; // 인스턴스를 null로 설정하여 메모리에서 해제
//                         },
//                         error: function (error) {
//                             console.error("Error destroying Janus instance", error);
//                         }
//                     });
//                 }
//             }).catch(error => {
//                 console.log(error)
//             })


//         }
//     }, [])

//     //내 비디오 연결
//     useEffect(() => {
//         const attachStreamToVideo = async () => {
//             try {
//                 if (myVideoRef.current && myStream) {
//                     if ('srcObject' in myVideoRef.current) {
//                         myVideoRef.current.srcObject = myStream;
//                     } else {
//                         myVideoRef.current.src = URL.createObjectURL(myStream);
//                     }
//                 }
//             } catch (error) {
//                 console.error("Error attaching stream to element:", error);
//             }
//         };
//         attachStreamToVideo();

//     }, [myStream]);


//     useEffect(() => {
//         feeds.forEach(feed => {
//             if (!feed) {
//                 return;
//             }
//             const videoElement = remoteVideoRef.current[feed.rfindex];


//             try {
//                 if (remoteVideoRef.current[feed.rfindex] && feed.stream) {
//                     if ('srcObject' in remoteVideoRef.current[feed.rfindex]) {
//                         remoteVideoRef.current[feed.rfindex].srcObject = feed.stream;
//                     } else {
//                         remoteVideoRef.current[feed.rfindex].src = URL.createObjectURL(feed.stream);
//                     }
//                 }
//             } catch (error) {
//                 console.error("Error attaching stream to element:", error);
//             }

//         })
//     }, [feeds])

//     useEffect(() => {
//         //새로운 피드가 들어오면 시작
//         if (!newFeed) {
//             return;
//         }
//         const updatedFeeds = [...feeds];
//         for (let i = 0; i < 6; i++) {
//             if (!updatedFeeds[i]) {
//                 // 리모트 피드를 추가
//                 updatedFeeds[i] = newFeed;
//                 newFeed.rfindex = i;
//                 // 상태를 업데이트하고 함수 종료
//                 setFeeds(updatedFeeds);
//                 break;
//             }
//         }
//     }, [newFeed]);

//     useEffect(() => {
//         if (!leaveId) {
//             return;
//         }
//         let remoteFeed = null;
//         for (var i = 0; i < 6; i++) {
//             if (feeds[i] && feeds[i].rfid == leaveId) {
//                 remoteFeed = feeds[i];
//                 break;
//             }
//         }
//         if (remoteFeed != null) {
//             Janus.debug("Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching");
//             remoteVideoRef.current[remoteFeed.rfindex].srcObject = null;
//             const updatedFeeds = [...feeds];
//             updatedFeeds.splice(remoteFeed.rfindex, 1);
//             setFeeds(updatedFeeds);
//             remoteFeed.detach();
//         }
//         setleaveId(null);
//     }, [leaveId]);

//     useEffect(() => {
//         if (clickUserNick) {
//             setUserDetail(true)
//         }
//     }, [clickUserNick])

//     //[jsflux] 내 화상화면 시작, 다른 사용자에게 보내주는 역할
//     const publishOwnFeed = (useAudio) => {
//         //WebRTC 연결하는데 사용
//         sfuClient.createOffer({
//             //오디오 및 비디오를 받지 않고 오디오 및 비디오를 전송하겠다는 의미
//             //사용자는 보내기만 함
//             media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: true },	// Publishers are sendonly
//             //여러 가지 품질의 비디오 스트림을 동시에 전송하여 네트워크 조건에 따라 가장 적합한 스트림을 선택할 수 있게 하는 기능
//             simulcast: true,
//             simulcast2: false,
//             success: function (jsep) {
//                 setPublish(true)
//                 Janus.debug("Got publisher SDP!", jsep);
//                 const publish = { request: "configure", audio: useAudio, video: true };
//                 sfuClient.send({ message: publish, jsep: jsep });
//             },
//             error: function (error) {
//                 Janus.error("WebRTC error:", error);
//                 //에러 시 오디오를 true로 해놨다면 오디오를 사용하지 않는 방식으로 재귀
//                 if (useAudio) {
//                     publishOwnFeed(false);
//                 } else {
//                     alert("WebRTC error... " + error.message);
//                 }
//             }
//         });
//     }

//     // [jsflux] 화면 끄기
//     function unpublishOwnFeed() {
//         setPublish(false)
//         var unpublish = { request: "unpublish" };
//         sfuClient.send({ message: unpublish });
//     }

//     // [jsflux] 음소거
//     function toggleMute() {
//         Janus.log((muted ? "Unmuting" : "Muting") + " local stream...");
//         if (muted)
//             sfuClient.unmuteAudio();
//         else
//             sfuClient.muteAudio();
//         setMuted(sfuClient.isAudioMuted())
//     }


//     // [jsflux] 새로운 유저 들어왔을때
//     function newRemoteFeed(id, display, audio, video) {
//         let remoteFeed = null;

//         janus.attach(
//             {
//                 plugin: "janus.plugin.videoroom",
//                 opaqueId: opaqueId,
//                 success: function (pluginHandle) {
//                     remoteFeed = pluginHandle;
//                     remoteFeed.simulcastStarted = true;
//                     Janus.log("Plugin attached! (" + remoteFeed.getPlugin() + ", id=" + remoteFeed.getId() + ")");
//                     Janus.log("  -- This is a subscriber");
//                     //"join"을 사용하여 구독 요청을 생성
//                     var subscribe = {
//                         request: "join",
//                         room: myroom,
//                         ptype: "subscriber",
//                         feed: id,
//                         private_id: Number(pvtId)
//                     };
//                     // 브라우저가 Safari이고 퍼블리셔가 지원하지 않는 코덱을 사용하는 경우 비디오를 비활성화하는 부분도 처리
//                     if (Janus.webRTCAdapter.browserDetails.browser === "safari" &&
//                         (video === "vp9" || (video === "vp8" && !Janus.safariVp8))) {
//                         if (video)
//                             video = video.toUpperCase()
//                         alert.warning("Publisher is using " + video + ", but Safari doesn't support it: disabling video");
//                         subscribe["offer_video"] = false;
//                     }
//                     remoteFeed.videoCodec = video;
//                     remoteFeed.send({ message: subscribe });
//                 },
//                 error: function (error) {
//                     Janus.error("  -- Error attaching plugin...", error);
//                     alert("Error attaching plugin... " + error);
//                 },
//                 onmessage: function (msg, jsep) {
//                     Janus.debug(" ::: Got a message (subscriber) :::", msg);
//                     var event = msg["videoroom"];
//                     Janus.debug("Event: " + event);
//                     if (msg["error"]) {
//                         alert(msg["error"]);
//                     } else if (event) {
//                         //구독자가 특정 피드에 성공적으로 연결되었음을 나타냄
//                         if (event === "attached") {
//                             //원격 피드
//                             remoteFeed.rfid = msg["id"];
//                             //사용자 이름
//                             remoteFeed.rfdisplay = msg["display"];
//                             setNewFeed(remoteFeed);
//                             Janus.log("Successfully attached to feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") in room " + msg["room"]);
//                         }
//                     }
//                     if (jsep) {
//                         Janus.debug("Handling SDP as well...", jsep);
//                         // 로컬 미디어 스트림을 수신하기 위한 응답을 생성
//                         remoteFeed.createAnswer(
//                             {
//                                 jsep: jsep,
//                                 //오디오랑 비디오 수신만
//                                 media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
//                                 success: function (jsep) {
//                                     Janus.debug("Got SDP!", jsep);
//                                     var body = { request: "start", room: myroom };
//                                     remoteFeed.send({ message: body, jsep: jsep });
//                                 },
//                                 error: function (error) {
//                                     Janus.error("WebRTC error:", error);
//                                     alert("WebRTC error... " + error.message);
//                                 }
//                             });
//                     }
//                 },
//                 iceState: function (state) {
//                     Janus.log("ICE state of this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") changed to " + state);
//                 },
//                 webrtcState: function (on) {
//                     Janus.log("Janus says this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") is " + (on ? "up" : "down") + " now");
//                 },
//                 onlocalstream: function (stream) {
//                     // The subscriber stream is recvonly, we don't expect anything here
//                 },
//                 onremotestream: function (stream) {
//                     Janus.debug("Remote feed #" + remoteFeed.rfindex + ", stream:", stream);
//                     remoteFeed.stream = stream;
//                     try {
//                         if (remoteVideoRef.current[remoteFeed.rfindex] && remoteFeed.stream) {
//                             if ('srcObject' in remoteVideoRef.current[remoteFeed.rfindex]) {
//                                 remoteVideoRef.current[remoteFeed.rfindex].srcObject = remoteFeed.stream;
//                             } else {
//                                 remoteVideoRef.current[remoteFeed.rfindex].src = URL.createObjectURL(remoteFeed.stream);
//                             }
//                         }
//                     } catch (error) {
//                         console.error("Error attaching stream to element:", error);
//                     }

//                 },
//                 oncleanup: function () {
//                     Janus.log(" ::: Got a cleanup notification (remote feed " + id + ") :::");
//                 }
//             });
//     }




//     return (<>
//         {/* 게임 선택 모달 */}
//         {openGame && <GameSelectModal roomNo={roomNo} close={() => { setOpenGame(false) }} />}
//         {/* 방 폭파 확인 모달 */}
//         {checkDestory && <DestoryCheckModal setCheckDestroy={setCheckDestory} destroy={destory} />}
//         {/* 메세지 모달 */}
//         {openModal && <BasicModalComponent message={message} callbackFunction={basicModalClose} />}
//         {/* 회원 정보 모달 */}
//         {userDetail && <UserDetail nickname={clickUserNick} close={() => {
//             setClickUserNick("");
//             setUserDetail(false);
//         }
//         } />}
//         <div className="w-full flex flex-wrap">
//             <div className="w-3/4 flex flex-col flex-wrap min-h-[600px]">
//             <div className="w-full h-24 px-12 flex flex-row justify-between items-center font-bold text-5xl text-white">
//                 <span className="">{title}</span>
//                 <ParticipantList participantList={participantList} setClickUserNick={setClickUserNick} />
//             </div>
//                 <div className="w-full flex flex-wrap items-start">
//                     <div className={"flex flex-col justify-center rounded-lg items-center text-center p-6 " + (participantList.length <= 3 ? "w-1/2" : "w-1/3")}>
//                         <div className="w-full  bg-black border-2 border-yellow-500 rounded-xl">
//                             <div className="relative">
//                                 <div className="pb-[56.25%] h-0 relative">
//                                     <video ref={myVideoRef} id="myvideo" className="w-full h-full box-border p-3 absolute object-cover" autoPlay playsInline muted />
//                                 </div>
//                                 <span className="absolute bottom-6 right-6 cursor-pointer" onClick={() => { setClickUserNick(nickname) }}><FaUserLarge size="40" /></span>
//                             </div>
//                             <span className="font-bold text-xl py-3 text-white" >{nickname}</span>
//                         </div>

//                     </div>

//                     {feeds.map((feed) => {
//                         return (
//                             <div className={"flex flex-col justify-center items-center text-center p-6 " + (participantList.length <= 3 ? "w-1/2" : "w-1/3")}>
//                                 <div className="w-full  bg-black border-2 border-white rounded-xl">
//                                     <div className="relative">
//                                         <div className="pb-[56.25%] h-0 relative">
//                                             <video ref={(el) => remoteVideoRef.current[feed.rfindex] = el} className="w-full h-full box-border p-3 absolute object-cover" autoPlay playsInline />
//                                         </div>
//                                         <span className="absolute bottom-6 right-6 cursor-pointer z-20" onClick={() => { setClickUserNick(feed.rfdisplay) }}><FaUserLarge size="40" /></span>
//                                     </div>
//                                     <span className="font-bold text-lg py-3 text-white">{feed.rfdisplay}</span>
//                                 </div>
//                             </div>
//                         )

//                     })}
//                 </div>
//             </div>
//             <div className="flex w-1/4 px-5">
//                 <Chat roomNo={roomNo} nickname={nickname}/>
//             </div>
//         </div>

//           <div className="flex flex-row px-10">
//             <div className="w-1/2 flex gap-5 text-white">
//                 <VideoButton muted={muted} publish={publish} publishOwnFeed={publishOwnFeed} unpublishOwnFeed={unpublishOwnFeed} toggleMute={toggleMute} />
//             </div>
//             <div className="w-1/2 flex items-center justify-end gap-5 text-lg font-bold">
//                 <button className="py-3 w-1/4 bg-gray-600 text-white" onClick={clickGame}>게임 선택</button>
//                 <button className="py-3 w-1/4 bg-white" onClick={clickDestoryRoom}>방 폭파</button>
//                 <button className="py-3 w-1/4 bg-[#BE2222] text-white" onClick={clickExitRoom}>나가기</button>
//             </div>
//             </div>      
//     </>);
// }

// export default VideoComponentV2;
