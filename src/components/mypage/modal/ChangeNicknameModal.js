import React, { useState } from "react";
import Modal from "react-modal";

const ChangeNicknameModal = ({ isOpen, onRequestClose, currentNickname, onNicknameChange }) => {
  const [nickname, setNickname] = useState(currentNickname);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleNicknameCheck = async () => {
    try {
      // 서버 요청을 통해 닉네임 중복 체크 로직
      // 임의의 중복 체크 로직 (예: 길이가 3 이상이면 사용 가능)
      if (nickname.length >= 3) {
        setIsNicknameAvailable(true);
      } else {
        setIsNicknameAvailable(false);
      }
    } catch (error) {
      console.error("Error checking nickname:", error);
      setIsNicknameAvailable(false);
    }
  };

  const handleSave = () => {
    if (isNicknameAvailable) {
      onNicknameChange(nickname);
      setSaveStatus("success");
      onRequestClose();
    } else {
      setSaveStatus("nickname-check-failed");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Change Nickname Modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-black p-8 rounded-lg border-2 border-pink-500 w-full max-w-md mx-auto text-white">
        <h2 className="text-xl text-pink-500 mb-4">닉네임 변경</h2>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">닉네임</label>
          <div className="flex">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              className="bg-pink-500 text-white rounded-lg ml-2 px-4 py-2"
              onClick={handleNicknameCheck}
            >
              중복 체크
            </button>
          </div>
          {isNicknameAvailable === false && (
            <div className="text-red-500 text-sm mt-2">이미 사용 중인 닉네임입니다.</div>
          )}
          {isNicknameAvailable === true && (
            <div className="text-green-500 text-sm mt-2">사용 가능한 닉네임입니다.</div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-pink-700"
            onClick={handleSave}
          >
            저장
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onRequestClose}
          >
            취소
          </button>
        </div>
        {saveStatus === "nickname-check-failed" && (
          <div className="text-red-500 text-sm mt-2">닉네임 중복 체크를 완료해주세요.</div>
        )}
      </div>
    </Modal>
  );
};

export default ChangeNicknameModal;
