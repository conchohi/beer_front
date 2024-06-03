import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GameModal = ({ isOpen, closeModal, title }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalContents, setModalContents] = useState([]);
  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    setModalContents(getModalContents(title));
  }, [title]);

  const getModalContents = (title) => {
    switch (title) {
      case "역전의 한방":
        return [
          { content: "역전의 한방은 첫 번째 사용 설명서입니다." },
          { content: "이것은 두 번째 사용 설명서입니다." },
          { content: "마지막 페이지입니다." },
        ];
      case "이미지 게임":
        return [
          { content: "이미지 게임은 첫 번째 게임 규칙입니다." },
          { content: "이미지 게임은 두 번째 게임 규칙입니다." },
          { content: "이미지 게임은 세 번째 게임 규칙입니다." },
          { content: "마지막 페이지입니다." },
        ];
      default:
        return [
          { content: "이것은 첫 번째 사용 설명서입니다." },
          { content: "이것은 두 번째 사용 설명서입니다." },
          { content: "이것은 세 번째 사용 설명서입니다." },
          { content: "마지막 페이지입니다." },
        ];
    }
  };

  // 이전 모달창 보여주기
  const prevModal = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // 다음 모달창 보여주기 또는 게임 페이지로 이동
  const nextModal = () => {
    if (currentStep < modalContents.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/info"); // 게임 페이지로 페이지 이동
    }
  };

  // 모달 닫기 및 첫 페이지로 리셋
  const resetAndCloseModal = () => {
    setCurrentStep(0); // 첫 페이지로 리셋
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-sm mx-auto relative">
        <button
          onClick={resetAndCloseModal}
          className="absolute top-2 right-2 text-black font-bold"
        >
          X
        </button>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-2 mb-10">{modalContents[currentStep]?.content}</p>
        <div className="flex justify-between mt-4 absolute bottom-2 left-2 right-2">
          <button
            onClick={prevModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-0.5 px-1 rounded-l"
          >
            이전
          </button>
          <button
            onClick={nextModal}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded-r ${
              currentStep === modalContents.length - 1 ? "" : ""
              //이거 마지막 버튼 크기 변화!!
            }`}
          >
            {currentStep === modalContents.length - 1
              ? "게임하러 가기"
              : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
