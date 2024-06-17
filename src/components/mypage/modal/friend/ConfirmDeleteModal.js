import React from "react";
import ModalLayout from "../../../../layouts/ModalLayout";

const ConfirmDeleteModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <ModalLayout>
        <div className="bg-slate-200 p-6 rounded-lg shadow-lg text-center border-2 border-pink-500 cursor-move">
          <h2 className="text-2xl mb-4 text-gray-700">친구를 삭제하시겠습니까?</h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors duration-300 ease-in-out"
            >
              예
            </button>
            <button
              onClick={onClose}
              className="bg-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-500 transition-colors duration-300 ease-in-out"
            >
              아니오
            </button>
          </div>
        </div>
      </ModalLayout>
    </div>
  );
};

export default ConfirmDeleteModal;
