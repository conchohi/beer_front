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

  const handleConfirmDelete = async () => {
    console.log(`Deleting user with userNo: ${props.userNo}`);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/follow/unfollow",
        {
          followerId: props.userId, // props에서 followerId를 받음
          followeeId: props.userNo,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`, // JWT 토큰을 props로 전달
          },
        }
      );
      console.log("User unfollowed:", response.data);
      // 성공적으로 언팔로우된 후, 리스트에서 제거하는 등의 추가 작업을 여기에 추가하세요.
      props.onUnfollow(props.userNo); // 언팔로우 후 리스트 갱신
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-700">
      <FriendImageDisplay fileName={friend.profileImage} />
      <div className="flex-grow">
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
