import React, { useState } from "react";
import Header from "../../layouts/Header.js";
import Footer from "../../layouts/Footer.js";
import GameModal from "../Modal/game/GameModal.js";

const Intro = () => {
  const [modalOn, setModalOn] = useState(false);
  const [nowContent, setNowContent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setModalOn(false);
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
    
      <div className="font-bold text-white font-gmarket-sans flex flex-col justify-center items-center break-keep relative min-h-screen overflow-hidden">
        <div
          className="rounded-lg text-left mx-4 sm:mx-[5%] md:mx-[8%] lg:mx-[12%] xl:mx-[15%] flex flex-wrap justify-center items-center overflow-hidden relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] xl:h-[90vh]"
          id="guidepage"
        >
          <div className="bg-[#222222] rounded-lg p-8 sm:p-10 lg:p-12 my-1 mx-2 sm:mx-5 lg:mx-10 h-fit flex flex-col justify-center items-center min-h-[60vh] relative">
            <h1 className="text-center text-white font-bold text-4xl mt-1 mb-5">
              게임 가이드
            </h1>
            <div className="flex justify-between items-center space-x-8 w-full mb-6">
              {gameGuides.map((guide) => (
                <img
                  key={guide.id}
                  src={guide.src}
                  alt={guide.alt}
                  id={guide.id}
                  onClick={() => openModal(guide.id)}
                  className="cursor-pointer h-[25vw] w-[13.3vw] rounded-2xl object-cover transition-transform duration-500 hover:scale-110"
                />
              ))}
            </div>
          </div>
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
