import React, { useState } from 'react';

const RoomControls = ({ onJoin }) => {
    const [room, setRoom] = useState('');
    const [username, setUsername] = useState('');

    const handleJoin = () => {
        if (room && username) {
            onJoin(room, username);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Room ID"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleJoin}>Join Room</button>
        </div>
    );
};

export default RoomControls;
