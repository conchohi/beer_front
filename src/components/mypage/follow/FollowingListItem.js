import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import ConfirmDeleteModal from "../modal/ConfirmDeleteModal"; // ConfirmDeleteModal 컴포넌트 가져오기

const FollowingListItem = (props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigateToProfile = () => {
    navigate(`/profile/${props.userNo}`);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log(`Deleting user with userNo: ${props.userNo}`);
    setIsModalOpen(false);
    // 여기에 실제 삭제 로직을 추가하세요.
  };

  return (
    <div>
      <div
        className="flex justify-center items-center mt-8 text-ellipsis whitespace-nowrap gap-4 transition-colors duration-300 ease-in-out hover:text-pink-500 cursor-pointer"
        onClick={navigateToProfile}
      >
        <img
          src={props.userImage || "/logo/basic.png"}
          className="w-20 h-20 rounded-full border-4 border-transparent bg-gradient-to-r from-white to-white bg-clip-border"
          alt="프로필"
        />
        <div className="text-2xl mx-2">
          <p>{props.userName}</p>
        </div>
        <div>
          <button
            className="ml-4 text-red-500 hover:text-pink-700 transition-colors duration-300 ease-in-out text-4xl"
            onClick={(e) => {
              e.stopPropagation(); // 부모 요소 클릭 이벤트 방지
              handleDelete();
            }}
          >
            <FaTrash className="w-8 h-8" />
          </button>
        </div>
        <div className="ml-auto flex items-center mr-4">
          {props.online && (
            <img className="w-14" src="Online.png" alt="Online" />
          )}
        </div>
      </div>
      {isModalOpen && (
        <ConfirmDeleteModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default React.memo(FollowingListItem);
