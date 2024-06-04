import React, { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import GameGuideModal from "../game/GameGuideModal"; 
import CatchMindModal from "../game/CatchMindModal";
import ChattingGuideModal from "../game/ChattingGuideModal"; 
import ImageGameGuideModal from "../game/ImageGameGuideModal";
import LotteryGuideModal from "../guide/LotteryGuideModal";
import PersonQuizGuideModal from "../game/PersonQuizGuideModal";
import PhotoGuideModal from "../guide/PhotoGuideModal";
import ShoutInSilenceGuideModal from "../game/ShoutInSilenceGuideModal";

const GuideModalFrame = ({ show, closeModal, nowContent }) => {
  const [modalContent, setModalContent] = useState(0);

  useEffect(() => {
    setModalContent(nowContent);
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("overflow-hidden");
    return () => {
      body.classList.remove("overflow-hidden");
    };
  }, [nowContent]);

  const nextGuide = () => {
    if (modalContent < 7) {
      setModalContent(modalContent + 1);
    }
  };
  const prevGuide = () => {
    if (modalContent > 0) {
      setModalContent(modalContent - 1);
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${show ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"}`}>
      <div className="relative w-[30vw] min-h-[55vh] max-h-[90vh] bg-[#222222] border-[0.3rem] border-[#f400b0] rounded-xl text-white text-5xl">
        <FaChevronLeft onClick={prevGuide} className="absolute top-1/2 left-4 text-5xl cursor-pointer text-white opacity-80" />
        <FaChevronRight onClick={nextGuide} className="absolute top-1/2 right-4 text-5xl cursor-pointer text-white opacity-80" />
        <button
          className="absolute top-4 right-2 border-none text-[#f400b0] bg-transparent text-2xl cursor-pointer"
          onClick={closeModal}
        >
          ✖
        </button>
        <div className="p-10 text-center">
          {modalContent === 0 && <GameGuideModal closeModal={closeModal} />}
          {modalContent === 1 && <PhotoGuideModal closeModal={closeModal} />}
          {modalContent === 2 && <ChattingGuideModal closeModal={closeModal} />}
          {modalContent === 3 && <ImageGameGuideModal closeModal={closeModal} />}
          {modalContent === 4 && <CatchMindModal closeModal={closeModal} />}
          {modalContent === 5 && <ShoutInSilenceGuideModal closeModal={closeModal} />}
          {modalContent === 6 && <PersonQuizGuideModal closeModal={closeModal} />}
          {modalContent === 7 && <LotteryGuideModal closeModal={closeModal} />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(GuideModalFrame);
