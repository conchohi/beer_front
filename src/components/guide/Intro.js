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
      id: "인물퀴즈",
      src: "/img/guessquiz.png",
      alt: "Inmulquiz",
    },
    {
      id: "몸으로말해요",
      src: "/img/bodylanguage.png",
      alt: "Momuromalhaeyo",
    },
    {
      id: "라이어게임",
      src: "/img/liargame.png",
      alt: "Liargame",
    },
    {
      id: "캐치마인드",
      src: "/img/catchmind.png",
      alt: "CatchMindGame",
    },
    {
      id: "밸런스게임",
      src: "/img/balancegame.png",
      alt: "BalanceGame",
    },
    {
      id: "폭탄돌리기",
      src: "/img/bomb.png",
      alt: "RandomBomb",
    },
    {
      id: "훈민정음",
      src: "/img/hunmin.png",
      alt: "Hunminjungum",
    },
    {
      id: "베스킨라빈스",
      src: "/img/Baskin.png",
      alt: "Baskinrobbins",
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
        <div className="h-1 w-20 bg-violet-600 mx-auto my-4"></div>
        <p className="text-gray-500 mb-6">
          다양한 게임 가이드를 확인하고 즐겨보세요!
        </p>
        <h2 className="text-2xl font-bold mb-10">
          게임 방법을 알아보고 즐겨보세요!
        </h2>
      </div>

      <div className="flex justify-center items-center gap-8 flex-wrap pb-20">
        {gameGuides.map((guide) => (
          <div
            key={guide.id}
            className="flex flex-col justify-center items-center bg-white/20 bg-opacity-30 p-6 rounded-xl shadow-lg w-80 h-auto cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => openModal(guide.id)}
          >
            <img
              className="rounded-lg shadow-lg w-11/12 h-auto object-cover"
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
