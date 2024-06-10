import React, { useState, useRef, useEffect } from "react";
import InfoModal from "../components/Modal/InfoModal";
import BasicLayout from "../layouts/BasicLayout";
import { Link, useLocation } from "react-router-dom";
import Intro from "../components/intro/Intro";
import SpaceCat from "../components/animation/SpaceCat";
import SpaceCat3 from "../components/animation/InfoCat/SpaceCat3";

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
      <div className="font-bold text-gray-200 flex flex-col pt-16 break-keep relative min-h-screen">
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold mb-2">
            처음이신가요?{" "}
            <span role="img" aria-label="leaf">
              🎃
            </span>
          </h1>
          <div className="h-1 w-20 bg-yellow-400 mx-auto my-4"></div>
          <p className="text-gray-500 mb-6">
            집에서 편하게 여러사람들과 술자리를 즐겨보세요!
          </p>
          <h2 className="text-2xl font-bold mb-10">
            이용하기 전 아래 가이드를 먼저 확인해 보세요!
          </h2>
        </div>

        <div className="flex justify-center items-center gap-8 flex-wrap">
          <div
            className="bg-yellow-300 p-6 rounded-xl shadow-lg w-64 h-48 flex flex-col justify-center items-center cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => openModal("이용시 주의사항")}
          >
            <div className="text-2xl font-bold text-white mb-4">#1</div>
            <div className="text-2xl font-bold text-white">이용시 주의사항</div>
          </div>
          <div
            className="bg-yellow-400 p-6 rounded-xl shadow-lg w-64 h-48 flex flex-col justify-center items-center cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => openModal("방 참여 및 개설 방법")}
          >
            <div className="text-2xl font-bold text-white mb-4">#2</div>
            <div className="text-2xl font-bold text-white">
              방 참여 및 개설방법{" "}
            </div>
          </div>
          <Link
            to="#intro"
            className="bg-yellow-500 p-6 rounded-xl shadow-lg w-64 h-48 flex flex-col justify-center items-center cursor-pointer transform transition duration-300 hover:scale-105"
          >
            <div className="text-2xl font-bold text-white mb-4">#3</div>
            <div className="text-2xl font-bold text-white">술 게임 가이드</div>
          </Link>
        </div>
        {/*화살표*/}
        <div className=" animate-bounce mt-32">
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

        <InfoModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          title={modalContent}
        ></InfoModal>
      </div>
      <div ref={introRef}>
        <Intro />
      </div>
    </BasicLayout>
  );
}

export default InfoPage;
