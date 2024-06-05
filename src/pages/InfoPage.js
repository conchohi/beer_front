import React, { useState, useRef, useEffect } from "react";
import InfoModal from "../components/Modal/InfoModal";
import BasicLayout from "../layouts/BasicLayout";
import { Link, useLocation } from "react-router-dom";
import Intro from "../components/intro/Intro";
import SpaceCat3 from "../components/animation/SpaceCat3";


function InfoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const introRef = useRef(null);
  const location = useLocation();

  const openModal = (content) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  useEffect(() => {
    if (location.hash === "#intro") {
      introRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <BasicLayout>
      <SpaceCat3 />
      <div className="font-bold text-white font-gmarket-sans flex flex-col justify-center items-center break-keep relative min-h-screen overflow-hidden">
        <div
          className="rounded-lg text-left mx-4 sm:mx-[5%] md:mx-[8%] lg:mx-[12%] xl:mx-[15%] flex flex-wrap justify-center items-center overflow-hidden relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] xl:h-[90vh]"
          id="guidepage"
        >
          <div className="bg-[#222222] rounded-lg p-8 sm:p-10 lg:p-12 my-1 mx-2 sm:mx-5 lg:mx-10 h-fit flex flex-col justify-center items-center min-h-[60vh] relative">
            <h1 className="text-center text-white font-bold text-4xl mb-1 mt-3">
              참여방법
            </h1>
            <div className="flex justify-between items-center w-full mb-6">
              <div></div>
              <Link
                to="#intro"
                className="bg-[#4b4b4b] hover:bg-[#5f5f5f] text-white font-bold py-2 px-2 rounded-md text-2xl mr-4"
              >
                🎮 게임 방법
              </Link>
            </div>

            <div className="flex justify-center gap-12 sm:gap-16 lg:gap-20 p-6">
              <div
                className="relative flex flex-col items-center justify-center cursor-pointer"
                onClick={() => openModal("방개설방법")}
              >
                <img
                  className="mb-4 rounded-lg w-48 sm:w-56 lg:w-64 xl:w-72"
                  src={`${process.env.PUBLIC_URL}/img/방 개설.png`}
                  alt="방 개설 이미지"
                />
              </div>
              <div
                className="relative flex flex-col items-center justify-center cursor-pointer"
                onClick={() => openModal("이용시 주의 사항")}
              >
                <img
                  className="mb-4 rounded-lg w-48 sm:w-56 lg:w-64 xl:w-72"
                  src={`${process.env.PUBLIC_URL}/img/주의 사항.png`}
                  alt="이용시 주의 사항"
                />
              </div>
              <div
                className="relative flex flex-col items-center justify-center cursor-pointer rounded-lg"
                onClick={() => openModal("게시판 이용 방법")}
              >
                <img
                  className="mb-4 rounded-lg w-48 sm:w-56 lg:w-64 xl:w-72"
                  src={`${process.env.PUBLIC_URL}/img/게시판 이용 방법.png`}
                  alt="게시판 이용 방법"
                />
              </div>
            </div>
          </div>
          <InfoModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            title={modalContent}
          ></InfoModal>
        </div>
        
        
        
      </div>
      <div ref={introRef}>
          <Intro />
          </div>
    </BasicLayout>
  );
}

export default InfoPage;
