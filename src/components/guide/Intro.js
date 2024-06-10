import React, { useState } from "react";
import GameModal from "../video/modal/game/GameModal";

const Intro = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const gameGuides = [
    {
      id: "이미지 게임",
      src: "./img/Landing/ImageGameGuide.webp",
      alt: "Image Game Guide",
    },
    {
      id: "캐치 마인드",
      src: "./img/Landing/CatchMindGuide.webp",
      alt: "Catch Mind Guide",
    },
    {
      id: "고요 속의 외침",
      src: "./img/Landing/ShoutInSilenceGuide.webp",
      alt: "Shout In Silence Guide",
    },
    {
      id: "인물 퀴즈",
      src: "./img/Landing/PersonQuizGuide.webp",
      alt: "Person Quiz Guide",
    },
  ];

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
        {gameGuides.map((guide) => (
          <div
            key={guide.id}
            className="flex flex-col justify-center items-center bg-yellow-400 p-6 rounded-xl shadow-lg w-64 h-auto cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => openModal(guide.id)}
          >
            <div className="text-2xl font-bold text-white mb-4">
              {guide.id}
            </div>
            <img
              className="rounded-lg shadow-lg w-40 h-auto object-cover"
              src={guide.src}
              alt={guide.alt}
            />
          </div>
        ))}
      </div>

      <GameModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title={modalContent}
      ></GameModal>
    </div>
  );
};

export default Intro;
