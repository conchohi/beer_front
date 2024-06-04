import React from "react";

const ConfirmDeleteModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-8 rounded-lg shadow-lg text-center border-4 border-pink-500">
        <h2 className="text-2xl mb-4">친구를 삭제하시겠습니까?</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors duration-300 ease-in-out"
          >
            예
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300 ease-in-out"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
