import React, { useState } from "react";
import InfoModal from "../components/InfoModal";
import BasicLayout from "../layouts/BasicLayout";

function InfoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  return (
    <BasicLayout>
      <h1 className="text-center font-bold text-3xl mb-4 mt-10">가이드</h1>
      {/* flex 클래스를 사용하여 아이템들을 가로 정렬합니다. */}
      <div className="flex justify-center gap-36 p-4">
        {/* 각 roomMake div를 클릭 가능하게 하고, onClick 이벤트를 추가하여 이미지 클릭 시 모달 창이 열리도록 함 */}
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openModal("방개설방법")}
        >
          {/* p 태그에 absolute와 중앙 정렬을 위한 Tailwind CSS 클래스 적용 */}
          <p className="absolute w-full text-center text-3xl text-white font-bold  ">
            방 개설 방법
          </p>
          <img
            className="mb-2"
            src={`${process.env.PUBLIC_URL}/img/방 개설.png`}
            alt="방 개설 이미지"
          />
        </div>
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openModal("이용시 주의 사항")}
        >
          <p className="absolute w-full text-center text-3xl text-white font-bold  ">
            이용시 주의 사항
          </p>
          <img
            className="mb-2"
            src={`${process.env.PUBLIC_URL}/img/방 개설.png`}
            alt="이용시 주의 사항"
          />
        </div>
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openModal("게시판 이용 방법")}
        >
          <p className="absolute w-full text-center text-3xl text-white font-bold  ">
            게시판 이용 방법
          </p>
          <img
            className="mb-2"
            src={`${process.env.PUBLIC_URL}/img/방 개설.png`}
            alt="게시판 이용 방법"
          />
        </div>
      </div>

      <InfoModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title={modalContent}
      >
        Content: {modalContent}
      </InfoModal>
    </BasicLayout>
  );
}

export default InfoPage;
