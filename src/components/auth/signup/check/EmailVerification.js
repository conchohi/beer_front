import React, { useState, useEffect } from "react";
import { publicApi } from "../../../../api/axios_intercepter";

const EmailVerification = ({
  formData,
  setFormData,
  isEmailVerified,
  setIsEmailVerified,
  setModalContent,
  setIsOpen,
}) => {
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (isCodeSent) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      if (timeLeft <= 0) {
        clearInterval(timer);
        setIsCodeSent(false);
        setTimeLeft(300);
      }
      return () => clearInterval(timer);
    }
  }, [isCodeSent, timeLeft]);

  const sendEmailVerificationCode = async () => {
    if (!formData.email) {
      setModalContent("이메일을 입력해주세요.");
      setIsOpen(true);
      return;
    }
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(formData.email)) {
      setModalContent("이메일 형식이 아닙니다.");
      setIsOpen(true);
      return;
    }
    try {
      await publicApi.post("/api/auth/email-verify", { email: formData.email });
      setModalContent("인증번호가 이메일로 전송되었습니다.");
      setIsOpen(true);
      setIsCodeSent(true);
      setTimeLeft(300); // Reset the countdown timer
    } catch (error) {
      console.error("이메일 인증번호 전송 오류:", error);
      setModalContent("이메일 인증번호 전송 오류가 발생했습니다.");
      setIsOpen(true);
    }
  };

  const verifyEmailCode = async () => {
    if (!emailVerificationCode) {
      setModalContent("인증번호를 입력해주세요.");
      setIsOpen(true);
      return;
    }

    try {
      const response = await publicApi.post("/api/auth/email-verify-check", {
        email: formData.email,
        code: emailVerificationCode,
      });
      if (response.data === "Email verified.") {
        setIsEmailVerified(true);
        setModalContent("이메일 인증이 완료되었습니다.");
        setIsOpen(true);
        setIsCodeSent(false); // Stop showing the verification code input
      } else {
        setIsEmailVerified(false);
        setModalContent("인증번호가 올바르지 않습니다.");
        setIsOpen(true);
      }
    } catch (error) {
      console.error("이메일 인증 오류:", error);
      setIsEmailVerified(false);
      setModalContent("이메일 인증 오류가 발생했습니다.");
      setIsOpen(true);
    }
  };

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-bold tracking-wider leading-6 text-pink-500"
      >
        E-MAIL
      </label>
      <div className="mt-2 flex">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력하세요"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
          disabled={isEmailVerified || isCodeSent}
        />

        <button
          type="button"
          onClick={sendEmailVerificationCode}
          className={`ml-4 px-4 py-2 w-4/12 rounded-md bg-pink-500 text-white tracking-widest text-xs font-semibold hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105 ${
            isEmailVerified ? "hidden" : ""
          }`}
        >
          VERIFY
        </button>
      </div>

      {isCodeSent && !isEmailVerified && (
        <div className="mt-2 flex items-center">
          <input
            id="emailVerificationCode"
            name="emailVerificationCode"
            type="text"
            placeholder="인증번호를 입력하세요"
            required
            value={emailVerificationCode}
            onChange={(e) => setEmailVerificationCode(e.target.value)}
            className="block w-5/12 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
          />
          <button
            type="button"
            onClick={verifyEmailCode}
            className="ml-4 px-6 py-2 w-3/12 rounded-md bg-pink-500 text-white tracking-widest text-xs font-semibold hover:bg-pink-600"
          >
            CHECK
          </button>
          <span className="ml-4 text-xs text-pink-500">
            {`남은 시간: ${Math.floor(timeLeft / 60)}분 ${timeLeft % 60}초`}
          </span>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
