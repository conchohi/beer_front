import React, { useState } from "react";
import GameModal from "../components/Modal/game/GameModal";
import Card from "../components/Card";

function GameInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (gameName) => {
    setIsModalOpen(true);
    setModalContent(gameName);
  };

  return (

      <div className="font-bold text-gray-200 flex flex-col pt-16 break-keep relative min-h-screen">
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold mb-2">
            게임 가이드{" "}
            <span role="img" aria-label="game">
              🎮
            </span>
          </h1>
          <div className="h-1 w-20 bg-yellow-400 mx-auto my-4"></div>
          <p className="text-gray-500 mb-6">
            다양한 게임 가이드를 확인하고 즐겨보세요!
          </p>
          <h2 className="text-2xl font-bold mb-10">
            게임 방법을 알아보고 즐겨보세요!
          </h2>
        </div>

        <div className="flex justify-center items-center gap-8 flex-wrap">
          <Card
            color="bg-yellow-300"
            onClick={() => openModal("이미지 게임")}
            title="이미지 게임"
            imageSrc={`${process.env.PUBLIC_URL}/img/방 개설.png`}
          />
          <Card
            color="bg-yellow-400"
            onClick={() => openModal("캐치 마인드")}
            title="캐치 마인드"
            imageSrc={`${process.env.PUBLIC_URL}/img/방 개설.png`}
          />
          <Card
            color="bg-yellow-500"
            onClick={() => openModal("고요 속의 외침")}
            title="고요 속의 외침"
            imageSrc={`${process.env.PUBLIC_URL}/img/방 개설.png`}
          />
          <Card
            color="bg-yellow-600"
            onClick={() => openModal("인물 퀴즈")}
            title="인물 퀴즈"
            imageSrc={`${process.env.PUBLIC_URL}/img/방 개설.png`}
          />
          <Card
            color="bg-yellow-700"
            onClick={() => openModal("역전의 한방")}
            title="역전의 한방"
            imageSrc={`${process.env.PUBLIC_URL}/img/방 개설.png`}
          />
        </div>

        {/* 화살표 */}
        <div className="animate-bounce mt-32">
          <svg
            className="mx-auto w-12 h-12 text-white"
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
