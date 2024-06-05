import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const Chat = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const stompClientRef = useRef(null);
    const username = "user"; // 닉네임 고정

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            stompClient.subscribe(`/topic/${roomId}`, (message) => {
                if (message.body) {
                    setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
                }
            });

            // 새로운 사용자가 입장했음을 알리는 메시지 전송
            stompClient.send(`/app/chat.addUser/${roomId}`, {}, JSON.stringify({ sender: username, type: 'JOIN' }));
        }, (error) => {
            console.error('Connection error: ', error);
        });

        return () => {
            if (stompClientRef.current) {
                // 퇴장 메시지 전송
                stompClientRef.current.send(`/app/chat.leaveUser/${roomId}`, {}, JSON.stringify({ sender: username, type: 'LEAVE' }));
                stompClientRef.current.disconnect();
            }
        };
    }, [roomId, username]);

    const handleSendMessage = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            const chatMessage = {
                sender: username,
                content: newMessage,
                type: 'CHAT'
            };
            stompClientRef.current.send(`/app/chat.sendMessage/${roomId}`, {}, JSON.stringify(chatMessage));
            setNewMessage('');
        } else {
            console.error("STOMP client is not connected");
        }
    };

    const enter = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="w-3/4 flex flex-col">
            <div className="w-full bg-white h-80 flex flex-col justify-center items-center border rounded-lg shadow-md">
                <ul className="w-full p-4 overflow-y-auto h-full text-lg text-black">
                    {messages.map((message, index) => (
                        <li key={index}>
                            {message.type === 'JOIN' ? (
                                <span className="text-pink-500 font-bold">{message.sender}님이 입장하셨습니다.</span>
                            ) : message.type === 'LEAVE' ? (
                                <span className="text-pink-500 font-bold">{message.sender}님이 퇴장하셨습니다.</span>
                            ) : (
                                <><span className="text-pink-500 font-bold">{message.sender}</span>: {message.content}</>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full bg-[#BE2222] my-5 text-white font-bold text-lg flex">
                <input 
                    className="w-4/5 p-2 text-black" 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={enter}
                />
                <button 
                    className="w-1/5 p-2" 
                    onClick={handleSendMessage}
                >
                    입력
                </button>
            </div>
        </div>
    );
};

export default Chat;
