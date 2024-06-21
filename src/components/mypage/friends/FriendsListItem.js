import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import privateApi from "../../../api/axios_intercepter";
import ConfirmDeleteModal from "../modal/friend/ConfirmDeleteModal";
import FriendImageDisplay from "../modal/friend/FriendImageDisplay";

const FriendsListItem = ({ friend, onFriendDeleted, setClickNickname }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await privateApi.delete(`/api/friend/delete`, { data: { nickname: friend.nickname } }).then(() => {
        onFriendDeleted();
      })
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const confirmDelete = () => {
    handleDelete();
    handleModal()
  };



  return (
    <div className="flex items-center justify-between p-2 m-2 bg-slate-100 rounded-2xl ">
      <div className="flex items-center cursor-pointer w-4/5" onClick={() => { setClickNickname(friend.nickname) }}>
        <FriendImageDisplay fileName={friend.profileImage} />
        <div className="flex-grow flex">
          <p className="ml-3 text-lg">{friend.nickname}</p>
        </div>
      </div>
      <button
        className="text-pink-500 hover:text-pink-600 mr-2"
        onClick={handleModal}
      >
        <FaTrash size={24} />
      </button>
      {isModalOpen && (
        <ConfirmDeleteModal onClose={handleModal} onConfirm={confirmDelete} />
      )}

    </div>
  );
};

export default FriendsListItem;
