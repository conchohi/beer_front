import React from "react";
import Modal from "react-modal";
import ModalLayout from "../../../layouts/ModalLayout";
import privateApi from "../../../api/axios_intercepter";
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = ({ isOpen, onRequestClose, onDeleted }) => {
  const navigate = useNavigate();
  const handleDeleteConfirm = async () => {
    try {
      const response = await privateApi.delete("/api/user/delete");
      if (response.status === 200) {
        onDeleted();
        localStorage.removeItem('access');
        localStorage.removeItem('nickname');
        localStorage.removeItem('auto_login');
        localStorage.removeItem('saved_password');
        navigate('/');
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Account Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0"
    >
      <ModalLayout>
        <div className="bg-slate-200 p-8 rounded-lg border-2 border-pink-500 w-full max-w-md mx-auto text-white">
          <h2 className="text-xl text-pink-500 mb-4">회원 탈퇴</h2>
          <p className="text-black mb-4">정말로 계정을 삭제하시겠습니까?</p>
          <div className="flex items-center justify-between">
            <button
              onClick={handleDeleteConfirm}
              className="bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-pink-700"
            >
              예
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onRequestClose}
            >
              아니오
            </button>
          </div>
        </div>
      </ModalLayout>
    </Modal>
  );
};

export default DeleteAccountModal;
