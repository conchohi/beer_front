import React, { useEffect, useRef, useState } from 'react';
import Janus from '../components/apis/Janus';
import $ from 'jquery';
import 'jquery/dist/jquery.min.js';

const server = "https://janus.jsflux.co.kr/janus"; // Janus 서버 URL

const JanusVideoChat = () => {
  const [janus, setJanus] = useState(null);
  const [sfutest, setSfutest] = useState(null);
  const [myid, setMyid] = useState(null);
  const [mystream, setMystream] = useState(null);
  const [feeds, setFeeds] = useState([]);
  const [room, setRoom] = useState(1234); // 기본 방 ID
  const [username, setUsername] = useState('');

  const myvideoRef = useRef(null);

  useEffect(() => {
    Janus.init({
      debug: "all",
      callback: () => {
        $('#start').one('click', startJanusSession);
      }
    });
  }, []);

  const startJanusSession = () => {
    if (!Janus.isWebrtcSupported()) {
      alert("No WebRTC support... ");
      return;
    }

    const janusInstance = new Janus({
      server,
      success: () => {
        janusInstance.attach({
          plugin: "janus.plugin.videoroom",
          opaqueId: "videoroomtest-" + Janus.randomString(12),
          success: (pluginHandle) => {
            setSfutest(pluginHandle);
            $('#details').remove();
            $('#videojoin').removeClass('hidden').show();
            $('#registernow').removeClass('hidden').show();
            $('#register').click(registerUsername);
            $('#roomname').focus();
            $('#start').removeAttr('disabled').html("Stop").click(() => {
              janusInstance.destroy();
            });
          },
          error: (error) => {
            console.error("Error attaching plugin...", error);
            alert("Error attaching plugin... " + error);
          },
          onmessage: onMessage,
          onlocalstream: onLocalStream,
          onremotestream: onRemoteStream,
          oncleanup: onCleanup
        });
      },
      error: (error) => {
        console.error(error);
        alert(error);
      },
      destroyed: () => {
        window.location.reload();
      }
    });

    setJanus(janusInstance);
  };

  const registerUsername = () => {
    const roomname = $('#roomname').val();
    const username = $('#username').val();

    if (!roomname || !username) {
      alert("Room ID와 닉네임을 입력해주세요.");
      return;
    }

    setRoom(Number(roomname));
    setUsername(username);

    const createRoom = {
      request: "create",
      room: Number(roomname),
      permanent: false,
      record: false,
      publishers: 6,
      bitrate: 128000,
      fir_freq: 10,
      ptype: "publisher",
      description: "test",
      is_private: false
    };

    sfutest.send({ message: createRoom, success: (result) => {
      if (result["videoroom"] === "created") {
        const register = { request: "join", room: Number(roomname), ptype: "publisher", display: username };
        sfutest.send({ message: register });
      } else {
        alert("Room creation failed: " + result["error"]);
      }
    }});
  };

  const onMessage = (msg, jsep) => {
    if (msg["videoroom"] === "joined") {
      setMyid(msg["id"]);
      setMystream(msg["stream"]);
      publishOwnFeed(true);
    } else if (msg["publishers"]) {
      const list = msg["publishers"];
      for (const publisher of list) {
        newRemoteFeed(publisher.id, publisher.display, publisher.audio_codec, publisher.video_codec);
      }
    }

    if (jsep) {
      sfutest.handleRemoteJsep({ jsep });
    }
  };

  const onLocalStream = (stream) => {
    setMystream(stream);
    if (myvideoRef.current) {
      Janus.attachMediaStream(myvideoRef.current, stream);
    }
  };

  const onRemoteStream = (stream) => {
    // Handle remote stream
  };

  const onCleanup = () => {
    setMystream(null);
    $('#videolocal').html('<button id="publish" className="btn btn-primary">Publish</button>');
    $('#publish').click(() => publishOwnFeed(true));
  };

  const publishOwnFeed = (useAudio) => {
    sfutest.createOffer({
      media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: true },
      success: (jsep) => {
        const publish = { request: "configure", audio: useAudio, video: true };
        sfutest.send({ message: publish, jsep });
      },
      error: (error) => {
        console.error("WebRTC error:", error);
        if (useAudio) {
          publishOwnFeed(false);
        } else {
          alert("WebRTC error... " + error.message);
          $('#publish').removeAttr('disabled').click(() => publishOwnFeed(true));
        }
      }
    });
  };

  const newRemoteFeed = (id, display, audio, video) => {
    let remoteFeed = null;
    janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: "videoroomtest-" + Janus.randomString(12),
      success: (pluginHandle) => {
        remoteFeed = pluginHandle;
        remoteFeed.send({ message: { request: "join", room, ptype: "subscriber", feed: id } });
      },
      error: (error) => {
        console.error("Error attaching plugin...", error);
        alert("Error attaching plugin... " + error);
      },
      onmessage: (msg, jsep) => {
        if (msg["videoroom"] === "attached") {
          // Handle remote feed attached
        }
        if (jsep) {
          remoteFeed.createAnswer({
            jsep,
            media: { audioSend: false, videoSend: false },
            success: (jsep) => {
              remoteFeed.send({ message: { request: "start", room }, jsep });
            },
            error: (error) => {
              console.error("WebRTC error:", error);
              alert("WebRTC error... " + error.message);
            }
          });
        }
      },
      onremotestream: (stream) => {
        // Handle remote stream
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="row" id="details">
        <div className="col-md-12">
          <h1 className="text-2xl font-bold mb-4">Janus Video Room</h1>
          <button id="start" className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded">Start</button>
        </div>
      </div>
      <div className="row hidden" id="videojoin">
        <div className="col-md-6">
          <div className="form-group mb-4">
            <label>Room ID</label>
            <input type="text" id="roomname" className="form-control border rounded p-2" placeholder="Room ID (숫자)" />
          </div>
          <div className="form-group mb-4">
            <label>Username</label>
            <input type="text" id="username" className="form-control border rounded p-2" placeholder="Username (영문)" />
          </div>
          <button id="registernow" className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded">Join</button>
        </div>
      </div>
      <div className="row hidden" id="videos">
        <div className="col-md-6">
          <div id="videolocal">
            <video ref={myvideoRef} id="myvideo" className="rounded" width="100%" height="100%" autoPlay playsInline muted />
          </div>
        </div>
        {/* Remote video elements will be appended here */}
      </div>
    </div>
  );
};

export default JanusVideoChat;
