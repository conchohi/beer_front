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
      case "인물퀴즈":
        return [
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">인물 퀴즈</span> 가이드{" "}
                </div>
                <div>
                  <img src="/img/인물퀴즈1.png"></img>
                </div>
                <h1 className="px-10 text-2xl  text-start pr-5">
                  이름을 정확히 입력 후 Enter or 전송 버튼 클릭 시{" "}
                  <span className="text-[#f400b0] font-bold">선착순</span>
                  으로 정답 처리 합니다.
                </h1>
              </>
            ),
          },
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">인물 퀴즈</span> 가이드{" "}
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
                <h1 className="px-10 text-2xl  text-start pr-5">
                  정답을 먼저 맞춘 유저닉네임이 상단에 표시 됩니다.{" "}
                  <span className="text-[#f400b0] font-bold">5점 먼저</span>
                  획득 시 게임은 끝납니다!
                </h1>
              </>
            ),
          },
        ];
        break;
      case "몸으로말해요":
        return [
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
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
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
                <h1 className="px-10 text-2xl  text-start pr-5">
                  각 참가자는 화면에 자신의 손가락이 모두 인식되도록{" "}
                  <span className="text-[#f400b0] font-bold">카메라에 손</span>
                  을 펼쳐 보입니다.
                </h1>
              </>
            ),
          },
        ];
        break;
      case "라이어게임":
        return [
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
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
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
                <h1 className="px-10 text-2xl  text-start pr-5">
                  각 참가자는 화면에 자신의 손가락이 모두 인식되도록{" "}
                  <span className="text-[#f400b0] font-bold">카메라에 손</span>
                  을 펼쳐 보입니다.
                </h1>
              </>
            ),
          },
        ];
        break;
      case "캐치마인드":
        return [
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
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
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
                <h1 className="px-10 text-2xl  text-start pr-5">
                  각 참가자는 화면에 자신의 손가락이 모두 인식되도록{" "}
                  <span className="text-[#f400b0] font-bold">카메라에 손</span>
                  을 펼쳐 보입니다.
                </h1>
              </>
            ),
          },
        ];
        break;
      case "밸런스게임":
        return [
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
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
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
                <h1 className="px-10 text-2xl  text-start pr-5">
                  각 참가자는 화면에 자신의 손가락이 모두 인식되도록{" "}
                  <span className="text-[#f400b0] font-bold">카메라에 손</span>
                  을 펼쳐 보입니다.
                </h1>
              </>
            ),
          },
        ];
        break;
      case "폭탄돌리기":
        return [
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
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
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
                <h1 className="px-10 text-2xl  text-start pr-5">
                  각 참가자는 화면에 자신의 손가락이 모두 인식되도록{" "}
                  <span className="text-[#f400b0] font-bold">카메라에 손</span>
                  을 펼쳐 보입니다.
                </h1>
              </>
            ),
          },
        ];
        break;
      case "훈민정음":
        return [
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
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
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
                <h1 className="px-10 text-2xl  text-start pr-5">
                  각 참가자는 화면에 자신의 손가락이 모두 인식되도록{" "}
                  <span className="text-[#f400b0] font-bold">카메라에 손</span>
                  을 펼쳐 보입니다.
                </h1>
              </>
            ),
          },
        ];
        break;
      case "베스킨라빈스":
        return [
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
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
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">몸으로 말해요 </span> 가이드
                </div>
                <div>
                  <img src="/img/인물퀴즈2.png"></img>
                </div>
                <h1 className="px-10 text-2xl  text-start pr-5">
                  각 참가자는 화면에 자신의 손가락이 모두 인식되도록{" "}
                  <span className="text-[#f400b0] font-bold">카메라에 손</span>
                  을 펼쳐 보입니다.
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
