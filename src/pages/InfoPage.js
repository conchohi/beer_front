import React, { useState } from "react";
import InfoModal from "../components/Modal/InfoModal";
import BasicLayout from "../layouts/BasicLayout";
import { Link } from "react-router-dom";

function InfoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  return (
    <BasicLayout>
      <div className="font-bold text-white font-gmarket-sans flex flex-col justify-center items-center break-keep relative min-h-screen overflow-hidden">
        <div
          className="rounded-lg text-left mx-4 sm:mx-[5%] md:mx-[8%] lg:mx-[12%] xl:mx-[15%] flex flex-wrap justify-center items-center overflow-hidden relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%]"
          id="guidepage"
        >
          <div className="bg-[#222222] rounded-lg p-8 sm:p-10 lg:p-12 my-1 mx-2 sm:mx-5 lg:mx-10 h-fit flex flex-col justify-center items-center min-h-[50vh] relative">
            <h1 className="text-center text-fuchsia-500 font-bold text-5xl mb-4 mt-4">
              가이드
            </h1>
            <div className="flex justify-between items-center w-full mb-4">
              <div></div>
              <Link
                to="/game"
                className="bg-[#4b4b4b] hover:bg-[#5f5f5f] text-white font-bold py-2 px-2 rounded-md text-3xl mr-4"
              >
                🎮 가이드
              </Link>
            </div>

            <div className="flex justify-center gap-8 sm:gap-12 lg:gap-16 p-4">
              <div
                className="relative flex flex-col items-center justify-center cursor-pointer"
                onClick={() => openModal("방개설방법")}
              >
                <img
                  className="mb-2 rounded-full w-32 sm:w-40 lg:w-48 xl:w-52"
                  src={`${process.env.PUBLIC_URL}/img/방 개설.png`}
                  alt="방 개설 이미지"
                />
              </div>
              <div
                className="relative flex flex-col items-center justify-center cursor-pointer"
                onClick={() => openModal("이용시 주의 사항")}
              >
                <img
                  className="mb-2 rounded-lg w-32 sm:w-40 lg:w-48 xl:w-52"
                  src={`${process.env.PUBLIC_URL}/img/주의 사항.png`}
                  alt="이용시 주의 사항"
                />
              </div>
              <div
                className="relative flex flex-col items-center justify-center cursor-pointer rounded-lg"
                onClick={() => openModal("게시판 이용 방법")}
              >
                <img
                  className="mb-2 rounded-lg w-32 sm:w-40 lg:w-48 xl:w-52"
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
    </BasicLayout>
  );
}

export default InfoPage;
