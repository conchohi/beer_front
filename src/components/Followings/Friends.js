import React, { useState } from "react";
import ChatModal from "../Modal/ChatModal";
import FriendsList from "./FriendsList ";

const Friends = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const friends = ["Alice", "Bob", "Charlie", "David", "Eve"];

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const closeModal = () => {
    setSelectedFriend(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen relative">
      <div className="flex-grow">
        <h1 className="text-center mt-10 text-3xl">Welcome to Chat App</h1>
        {selectedFriend && (
          <ChatModal friend={selectedFriend} closeModal={closeModal} />
        )}
      </div>
      <button
        className={`absolute top-4 ${
          isSidebarOpen ? "right-64" : "right-4"
        } bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 z-20 transition-all`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? ">>" : "<<"}
      </button>
      <FriendsList
        friends={friends}
        onFriendClick={handleFriendClick}
        isOpen={isSidebarOpen}
      />
    </div>
  );
};

export default Friends;
