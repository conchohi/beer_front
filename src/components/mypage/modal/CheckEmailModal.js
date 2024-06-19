import React, { useState } from "react";
import Modal from "react-modal";
import privateApi from "../../../api/axios_intercepter";
import ModalLayout from "../../../layouts/ModalLayout";
import { FaTimes } from "react-icons/fa";

const CheckEmailModal = ({ isOpen, onRequestClose, onEmailVerified }) => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  // 이메일 형식 유효성 검사
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  // 이메일 입력 시 유효성 검사 실행
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  // 인증 번호 전송
  const handleSendVerificationEmail = async () => {
    try {
      await privateApi.post('/api/auth/email-verify', { email });
      setEmailSent(true);
      setMessage("인증번호가 전송되었습니다.");
    } catch (error) {
      setMessage(error.response?.data || "메일 전송에 오류가 발생했습니다.");
    }
  };

  // 이메일 인증
  const handleVerifyEmail = async () => {
    try {
      const response = await privateApi.post('/api/auth/email-verify-check', { email, code: verificationCode });
      if (response.status === 200) {
        onEmailVerified(email);
        onRequestClose();
      }
    } catch (error) {
      setMessage(error.response?.data || "인증에 실패했습니다.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Check Email Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0"
    >
      <ModalLayout>
        <div className="bg-slate-200 p-8 rounded-lg border-2 border-pink-500 w-full max-w-md mx-auto text-white relative">
          {/* 오른쪽 위 닫기 버튼 */}
          <button onClick={onRequestClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
          <h2 className="text-xl text-pink-500 mb-4">이메일 변경</h2>
          {!emailSent ? (
            <>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일을 입력하세요"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
                onMouseDown={handleMouseDown}
              />
              {/* 이메일 형식 유효성 검사 메시지 */}
              {!emailValid && email && (
                <div className="text-red-500 text-sm mb-2">
                  유효한 이메일 주소를 입력하세요.
                </div>
              )}
              <button
                onClick={handleSendVerificationEmail}
                className="bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-pink-700 w-full"
                disabled={!emailValid || !email}
              >
                인증 번호 전송
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증 코드를 입력하세요"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
                onMouseDown={handleMouseDown}
              />
              <button
                onClick={handleVerifyEmail}
                className="bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-pink-700 w-full"
              >
                인증하기
              </button>
            </>
          )}
          {message && <p className="mt-2 text-red-500">{message}</p>}
        </div>
      </ModalLayout>
    </Modal>
  );
};

export default CheckEmailModal;
