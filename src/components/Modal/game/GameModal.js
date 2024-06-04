import React, { useState, useEffect } from "react";
import { FaCamera, FaHandPaper } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GameModal = ({ isOpen, closeModal, title }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalContents, setModalContents] = useState([]);
  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    setModalContents(getModalContents(title));
  }, [title]);

  const getModalContents = (title) => {
    switch (title) {
      case "역전의 한방":
        return [
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">사진 촬영</span> 가이드{" "}
                </div>
                <FaCamera />
                <ol className="px-10 text-2xl font-light text-start">
                  <li>
                    화면 하단의{" "}
                    <span className="text-[#f400b0] font-bold">사진 버튼</span>
                    을 누르면 5초 후 사진이 촬영됩니다.
                  </li>
                  <li>
                    사진 촬영 후, 사진의{" "}
                    <span className="text-[#f400b0] font-bold">
                      프레임, 제목, 본문
                    </span>
                    을 설정할 수 있는 창이 출력됩니다.
                  </li>
                  <li>
                    찍은 사진은{" "}
                    <span className="text-[#f400b0] font-bold">
                      '피드에 저장' 버튼
                    </span>
                    으로 프로필에 저장할 수 있습니다.
                  </li>
                  <li>취소 버튼을 누르면 찍었던 사진은 사라집니다.</li>
                </ol>
              </>
            ),
          },
        ];
      case "이미지 게임":
        return [
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">게임 가이드 </span>
                  이미지 게임
                </div>
                <FaHandPaper />
                <h1 className="px-10 text-2xl  text-start pr-5">
                  각 참가자는 화면에 자신의 손가락이 모두 인식되도록{" "}
                  <span className="text-[#f400b0] font-bold">카메라에 손</span>
                  을 펼쳐 보입니다.
                </h1>
              </>
            ),
          },
          {
            content: (
              <>
                <FaHandPaper />
                <h1 className="px-10 text-2xl  text-start pr-5">
                  해당 키워드에{" "}
                  <span className="text-[#f400b0] font-bold">
                    해당하는 참가자
                  </span>
                  는{" "}
                  <span className="text-[#f400b0] font-bold">
                    손가락을 하나
                  </span>{" "}
                  접습니다. 손가락이 모두 접힌 사람이 나올 때 까지 반복합니다.
                  을 펼쳐 보입니다. 손이{" "}
                  <span className="text-[#f400b0] font-bold">
                    모두 접힌 사람은 점수가 차감됩니다.
                  </span>
                  누구를 노릴지, 전략적으로 생각해 봅시다.
                </h1>
              </>
            ),
          },
        ];
      default:
        return [
          { content: "이것은 첫 번째 사용 설명서입니다." },
          { content: "이것은 두 번째 사용 설명서입니다." },
          { content: "이것은 세 번째 사용 설명서입니다." },
          { content: "마지막 페이지입니다." },
        ];
    }
  };

  // 이전 모달창 보여주기
  const prevModal = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // 다음 모달창 보여주기 또는 게임 페이지로 이동
  const nextModal = () => {
    if (currentStep < modalContents.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/chat/list"); // 게임 페이지로 페이지 이동
    }
  };

  // 모달 닫기 및 첫 페이지로 리셋
  const resetAndCloseModal = () => {
    setCurrentStep(0); // 첫 페이지로 리셋
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-sm mx-auto relative text-black">
        <button
          onClick={resetAndCloseModal}
          className="absolute top-2 right-2 text-black font-bold"
        >
          X
        </button>

        <div className="mt-2 mb-10 ">{modalContents[currentStep]?.content}</div>
        <div className="flex justify-between mt-4 absolute bottom-2 left-2 right-2">
          <button
            onClick={prevModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-0.5 px-1 rounded-l"
          >
            이전
          </button>
          <button
            onClick={nextModal}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded-r ${
              currentStep === modalContents.length - 1 ? "" : ""
              //이거 마지막 버튼 크기 변화!!
            }`}
          >
            {currentStep === modalContents.length - 1
              ? "게임하러 가기"
              : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
