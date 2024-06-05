import React, { useState } from "react";
import GameModal from "../components/Modal/game/GameModal";

function GameInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (gameName) => {
    setIsModalOpen(true);
    setModalContent(gameName);
  };

  return (
    <div className="main">
      <h1 className="text-center font-bold text-3xl mb-4 mt-10">게임 가이드</h1>
      {/* flex 클래스를 사용하여 아이템들을 가로 정렬합니다. */}
      <div className="flex justify-center gap-24 p-4">
        {/* 각 roomMake div를 클릭 가능하게 하고, onClick 이벤트를 추가하여 이미지 클릭 시 모달 창이 열리도록 함 */}
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openModal("이미지 게임")}
        >
          <p>이미지 게임</p>
          <img
            className="mb-2"
            src={`${process.env.PUBLIC_URL}/img/방 개설.png`}
            alt="이미지 게임"
          />
          {/* Tailwind CSS를 사용하여 버튼 스타일 적용 */}
        </div>
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openModal("캐치 마인드")}
        >
          <p>캐치 마인드</p>
          <img
            className="mb-2"
            src={`${process.env.PUBLIC_URL}/img/방 개설.png`}
            alt="이용시 주의 사항"
          />
        </div>
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openModal("고요 속의 외침")}
        >
          <p>고요 속의 외침</p>
          <img
            className="mb-2"
            src={`${process.env.PUBLIC_URL}/img/방 개설.png`}
            alt="게시판 이용 방법"
          />
        </div>
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openModal("인물 퀴즈")}
        >
          <p>인물 퀴즈</p>
          <img
            className="mb-2"
            src={`${process.env.PUBLIC_URL}/img/방 개설.png`}
            alt="게시판 이용 방법"
          />
        </div>
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openModal("역전의 한방")}
        >
          <p>역전의 한방</p>
          <img
            className="mb-2"
            src={`${process.env.PUBLIC_URL}/img/방 개설.png`}
            alt="게시판 이용 방법"
          />
        </div>
      </div>
      <div className="animate-bounce mt-2">
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>

      <GameModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title={modalContent}
      ></GameModal>
    </div>
  );
}

export default GameInfo;
