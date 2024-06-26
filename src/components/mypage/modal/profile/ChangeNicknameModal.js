import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { publicApi } from "../../../../api/axios_intercepter";
import ModalLayout from "../../../../layouts/ModalLayout";

const ChangeNicknameModal = ({ isOpen, onRequestClose, currentNickname, onNicknameChange }) => {
  const [nickname, setNickname] = useState(currentNickname);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [nicknameValid, setNicknameValid] = useState(true);

  // 닉네임 변경 시 유효성 검사 및 중복 체크 초기화
  const handleNicknameChange = (e) => {
    const { value } = e.target;
    setNickname(value);

    if (value.length > 20) {
      setNicknameValid(false);
    } else {
      setNicknameValid(true);
    }
    setIsNicknameAvailable(null); // 중복 체크 초기화
  };

  // 닉네임 중복 체크
  const handleNicknameCheck = async () => {
    if (!nicknameValid) {
      setIsNicknameAvailable(false);
      return;
    }
    
    try {
      const response = await publicApi.post("/api/user/nickname-check", { nickname });
      setIsNicknameAvailable(response.data.message === "Success.");
    } catch (error) {
      console.error("Error checking nickname:", error);
      setIsNicknameAvailable(false);
    }
  };

  // 닉네임 저장
  const handleSave = () => {
    if (isNicknameAvailable) {
      onNicknameChange(nickname);
      setSaveStatus("success");
      onRequestClose();
    } else {
      setSaveStatus("nickname-check-failed");
    }
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Change Nickname Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0"
    >
      <ModalLayout>
        <div className="bg-slate-200 p-8 rounded-lg border-2 border-pink-500 w-full max-w-md mx-auto text-white relative">
          {/* 오른쪽 위 닫기 버튼 */}
          <button onClick={onRequestClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
          <h2 className="text-xl text-pink-500 mb-4">닉네임 변경</h2>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">닉네임</label>
            <div className="flex">
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                onMouseDown={handleMouseDown}
              />
              <button
                className="bg-pink-500 text-white rounded-lg ml-2 px-4 py-2 w-4/12"
                onClick={handleNicknameCheck}
                disabled={!nicknameValid}
              >
                중복 체크
              </button>
            </div>
            {/* 닉네임 유효성 검사 실패 시 메시지 */}
            {!nicknameValid && (
              <div className="text-red-500 text-sm mt-2">닉네임은 20자 이하로 입력해주세요.</div>
            )}
            {/* 닉네임 중복 체크 결과 메시지 */}
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
          {/* 닉네임 저장 실패 시 메시지 */}
          {saveStatus === "error" && (
            <div className="text-red-500 text-sm mt-2">닉네임 저장 중 오류가 발생했습니다. 다시 시도해주세요.</div>
          )}
          {/* 닉네임 중복 체크 실패 시 메시지 */}
          {saveStatus === "nickname-check-failed" && (
            <div className="text-red-500 text-sm mt-2">닉네임 중복 체크를 완료해주세요.</div>
          )}
        </div>
      </ModalLayout>
    </Modal>
  );
};

export default ChangeNicknameModal;
