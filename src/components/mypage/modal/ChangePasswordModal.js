import React, { useState } from "react";
import Modal from "react-modal";
import privateApi from "../../../api/axios_intercepter";
import ModalLayout from "../../../layouts/ModalLayout";
import { FaTimes } from "react-icons/fa";

const ChangePasswordModal = ({ isOpen, onRequestClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  // 입력 중 클릭 이벤트 중지
  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  // 새 비밀번호 변경 시 유효성 검사
  const handleNewPasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
    setPasswordValid(passwordRegex.test(value));
  };

  // 비밀번호 변경 처리
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMessage("모든 비밀번호 필드를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await privateApi.post('/api/user/pwchange', { currentPassword, newPassword });
      if (response.status === 200) {
        onRequestClose();
      } else {
        setMessage("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      setMessage(error.response?.data || "비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Change Password Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <ModalLayout>
        <div className="bg-slate-200 p-8 rounded-lg border-2 border-pink-500 w-full max-w-md mx-auto text-white relative">
          {/* 오른쪽 위 닫기 버튼 */}
          <button onClick={onRequestClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
          <h2 className="text-xl text-pink-500 mb-4">비밀번호 변경</h2>
          <div className="mb-4">
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              onMouseDown={handleMouseDown}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="새 비밀번호"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              onMouseDown={handleMouseDown}
            />
            {/* 비밀번호 유효성 검사 메시지 */}
            {!passwordValid && (
              <div className="text-red-500 text-sm mt-2">
                비밀번호는 영문, 숫자를 포함하여 8자 이상 20자 이하이어야 합니다.
              </div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="새 비밀번호 확인"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              onMouseDown={handleMouseDown}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleChangePassword}
              className="bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-pink-700"
              disabled={!passwordValid || newPassword !== confirmNewPassword || !currentPassword || !newPassword || !confirmNewPassword}
            >
              비밀번호 변경
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onRequestClose}
            >
              취소
            </button>
          </div>
          {/* 메시지 출력 */}
          {message && <p className="mt-2 text-red-500">{message}</p>}
        </div>
      </ModalLayout>
    </Modal>
  );
};

export default ChangePasswordModal;
