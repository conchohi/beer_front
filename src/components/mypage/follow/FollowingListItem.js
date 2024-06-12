import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import privateApi from "../../../api/axios_intercepter";
import ConfirmDeleteModal from "../modal/friend/ConfirmDeleteModal";
import FriendImageDisplay from "../modal/friend/FriendImageDisplay";

const FollowingListItem = ({ friend, onFriendDeleted }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await privateApi.delete(`/api/friend/delete`, { data: { nickname: friend.nickname } });
      onFriendDeleted(friend.userId);
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    handleDelete();
    closeModal();
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-700">
      <FriendImageDisplay fileName={friend.profileImage} />
      <div className="flex-grow flex">
        <p className="text-lg">{friend.nickname}</p>
      </div>
      <button
        className="text-red-500 hover:text-red-600"
        onClick={openModal}
      >
        <FaTrash size={24} />
      </button>
      {isModalOpen && (
        <ConfirmDeleteModal onClose={closeModal} onConfirm={confirmDelete} />
      )}
    </div>
  );
};

export default FollowingListItem;
