import React, { useState, useEffect } from 'react';
import Janus from '../apis/Janus';

const JanusRoom = () => {
  const [janus, setJanus] = useState(null);
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const [pluginHandle, setPluginHandle] = useState(null);

  useEffect(() => {
    Janus.init({
      debug: 'all',
      callback: () => {
        const janusInstance = new Janus({
          server: 'https://janus.jsflux.co.kr/janus',
          success: () => {
            janusInstance.attach({
              plugin: 'janus.plugin.videoroom',
              success: (pluginHandle) => {
                setPluginHandle(pluginHandle);
              },
              error: (error) => {
                console.error('Error attaching plugin:', error);
              },
              onmessage: (msg, jsep) => {
                console.log('Received message:', msg);
                if (jsep !== undefined && jsep !== null) {
                  pluginHandle.createAnswer({
                    jsep: jsep,
                    media: { audio: true, video: true },
                    success: (jsep) => {
                      const body = { request: 'start', room: room };
                      pluginHandle.send({ message: body, jsep: jsep });
                    },
                    error: (error) => {
                      console.error('WebRTC error:', error);
                    },
                  });
                }
              },
              onlocalstream: (stream) => {
                const video = document.getElementById('localvideo');
                Janus.attachMediaStream(video, stream);
              },
              onremotestream: (stream) => {
                const video = document.getElementById('remotevideo');
                Janus.attachMediaStream(video, stream);
              },
            });
          },
          error: (error) => {
            console.error('Janus error:', error);
          },
        });
        setJanus(janusInstance);
      },
    });
  }, []);

  const joinRoom = () => {
    if (pluginHandle) {
      const register = {
        request: 'join',
        room: parseInt(room),
        ptype: 'publisher',
        display: username,
      };
      pluginHandle.send({ message: register });
    }
  };

  return (
    <div>
      <h1>Janus Room</h1>
      <div>
        <input
          type="text"
          placeholder="Room Number"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        <h2>Local Stream</h2>
        <video id="localvideo" width="320" height="240" autoPlay muted></video>
      </div>
      <div>
        <h2>Remote Stream</h2>
        <video id="remotevideo" width="320" height="240" autoPlay></video>
      </div>
    </div>
  );
};

export default JanusRoom;
