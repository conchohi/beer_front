import React, { useEffect, useRef } from "react";

const ChatBox2 = ({ messages, newMessage, setNewMessage, handleSendMessage }) => {
  const chatMessagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const enter = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-box flex bg-white rounded-lg flex-col shadow-lg p-4 h-[100px]">
      <div className="chat-content flex-1 overflow-y-scroll scrollbar-hide p-1">
        <ul className="chat-messages space-y-2">
          {messages.map((message, index) => (
            <li key={index}>
              {message.type === "JOIN" ? (
                <span className="text-pink-500 font-bold">
                  {message.sender}님이 입장하셨습니다.
                </span>
              ) : message.type === "LEAVE" ? (
                <span className="text-pink-500 font-bold">
                  {message.sender}님이 퇴장하셨습니다.
                </span>
              ) : (
                <>
                  <span className="text-pink-500 font-bold">
                    {message.sender}
                  </span>
                  : {message.content}
                </>
              )}
            </li>
          ))}
          <div ref={chatMessagesEndRef} />
        </ul>
      </div>
      <div className="send-message flex mt-4">
        <input
          type="text"
          className="input-message flex-1 rounded-full bg-slate-200 px-4 py-2"
          placeholder="메시지를 입력하세요"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={enter}
        />
        <button
          type="button"
          className="send-button bg-yellow-500 text-gray-800 rounded-full px-4 ml-2"
          onClick={handleSendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatBox2;
