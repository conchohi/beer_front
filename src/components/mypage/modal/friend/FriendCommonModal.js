import React from "react";

const FriendCommonModal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-slate-100 text-gray-700 border-2 border-pink-600 rounded-lg p-4 lg:w-2/12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">알림</h2>
          <button className="text-2xl text-white" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="mb-4">
          <p className="text-lg">{message}</p>
        </div>
        <button
          className="w-full p-2 bg-pink-500 rounded text-white text-xl"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default FriendCommonModal;
