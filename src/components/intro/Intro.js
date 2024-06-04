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
    {
      id: "역전의 한방",
      src: "./img/Landing/LotteryGuide.webp",
      alt: "Lottery Guide",
    },
  ];

  return (
    <>
      <Header />
      <div className="font-bold text-white font-gmarket-sans flex flex-col justify-center items-center break-keep relative min-h-screen overflow-hidden">
        <div
          className="rounded-lg text-left   mx-4 sm:mx-[8.3%] md:mx-[10%] lg:mx-[15%] xl:mx-[20%] flex flex-wrap gap-5 justify-center items-center overflow-hidden relative"
          id="guidepage"
        >
          <div className="bg-[#222222] rounded-lg p-8 sm:p-16 lg:p-20 my-5 mx-2 sm:mx-5 lg:mx-10 h-fit flex flex-col justify-center items-center min-h-[50vh]">
            <p className="text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] mb-10 sm:mb-10 ">
              게임 가이드
            </p>
            <div className="flex flex-wrap gap-14 justify-center items-center">
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
      <Footer />
    </>
  );
};

export default Intro;
