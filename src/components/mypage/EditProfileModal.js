import React from "react";
import Modal from "react-modal";

const EditProfileModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="정보 수정"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl mb-4">정보 수정</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">닉네임</label>
            <input type="text" className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">성명</label>
            <input type="text" className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">MBTI</label>
            <input type="text" className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">나이</label>
            <input type="number" className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white" />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-gray-500 text-white rounded-lg px-4 py-2 mr-2"
            >
              취소
            </button>
            <button type="submit" className="bg-pink-500 text-white rounded-lg px-4 py-2">
              저장
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
