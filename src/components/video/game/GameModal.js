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
                  <img src="/img/인물퀴즈1.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  사진 속 인물의 이름을 정확히 입력 후 Enter / 전송 버튼 클릭 시{" "}
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
                  <img src="/img/인물퀴즈2.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  정답을 먼저 맞춘 유저의 닉네임이 상단에 표시 됩니다.{" "}
                  <span className="text-[#f400b0] font-bold">5점 먼저 </span>
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
                  <img src="/img/몸으로 말해요 가이드1.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="mt-5 px-10 text-2xl text-start">
                  각 참가자는 화면에 출제자 확인 후 
                  <span className="text-[#f400b0] font-bold">
                  {" "}출제자의 화면{" "}
                  </span>
                  을 주시합니다.
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
                  <img src="/img/몸으로말해요2.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start pr-5">
                  출제자는 주어진 제시어에 따라{" "}
                  <span className="text-[#f400b0] font-bold">몸으로 </span>
                  제시어를 설명합니다.
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
                  <span className="text-[#f400b0]">라이어 게임 </span> 가이드
                </div>
                <div>
                  <img src="/img/라이어게임 2.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  화면에 주제는 공통으로 주어지고{" "}
                  <span className="text-[#f400b0] font-bold">라이어에게만 </span>
                  특정 단어 대신 라이어 임을 알려줍니다. 다른 사람의 대화 내용을
                  듣고 단어를 유추 해보세요.
                </h1>
              </>
            ),
          },
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">라이어 게임 </span> 가이드
                </div>
                <div>
                  <img src="/img/라이어게임 2.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl  text-start">
                  유저들은 라이어를 찾으면서{" "}
                  <span className="text-[#f400b0] font-bold">특정 단어를 </span>
                  라이어에게 들키지 않도록 주의 합니다.
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
                  <span className="text-[#f400b0]">캐치마인드 </span> 가이드
                </div>
                <div>
                  <img src="/img/캐치마인드 가이드1.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  각 참가자는 출제자가 그린 그림을 보면서{" "}
                  <span className="text-[#f400b0] font-bold">주제를 </span>
                  맞추는 게임입니다.
                </h1>
              </>
            ),
          },
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">캐치마인드 </span> 가이드
                </div>
                <div>
                  <img src="/img/캐치마인드2.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  출제자는{" "}
                  <span className="text-[#f400b0] font-bold">주제를 </span>
                  그림으로 그려서 알려줍니다.{" "}
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
                  <span className="text-[#f400b0]"> 밸런스게임 </span> 가이드
                </div>
                <div>
                  <img src="/img/밸런스게임.png"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  주어진 시간안에 두 개 중 하나를{" "}
                  <span className="text-[#f400b0] font-bold">선택</span>
                  하면 됩니다.
                </h1>
              </>
            ),
          },
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">밸런스게임 </span> 가이드
                </div>
                <div>
                  <img src="/img/밸런스게임2.png"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  모든 참가자가 선택시{" "}
                  <span className="text-[#f400b0] font-bold">투표 결과를 </span>
                  확인 할 수 있습니다.
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
                  <span className="text-[#f400b0]">폭탄돌리기 </span> 가이드
                </div>
                <div>
                  <img src="/img/폭탄게임1.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  폭탄은{" "}
                  <span className="text-[#f400b0] font-bold">5 ~ 20 초</span>{" "}
                  사이에{" "}
                  <span className="text-[#f400b0] font-bold">랜덤으로 </span>
                  터지도록 설정 되어 있습니다.
                </h1>
              </>
            ),
          },
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">폭탄돌리기 </span> 가이드
                </div>
                <div>
                  <img src="/img/폭탄돌리기.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  만약 폭탄을 가지게 된다면{" "}
                  <span className="text-[#f400b0] font-bold">
                    다른 유저에게 {" "}
                  </span>
                  전달할 수 있고, 터질 때 <span className="text-[#f400b0] font-bold">가지고 있는 사람이 패배합니다.</span>
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
                  <span className="text-[#f400b0]">훈민정음 </span> 가이드
                </div>
                <div>
                  <img src="/img/훈민정음1.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  주어진 초성에 맞게 단어를 빠르게 입력하면 됩니다.{" "}
                  <span className="text-[#f400b0] font-bold"><br/>맨 마지막</span>에
                  입력한 유저는{" "} <br/>
                  <span className="text-[#f400b0] font-bold">-1 점</span> 을
                  받습니다.
                </h1>
              </>
            ),
          },
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">훈민정음 </span> 가이드
                </div>
                <div>
                  <img src="/img/훈민정음2.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  만약 주어진 시간에 단어를 입력하지 못한 유저들도{" "} <br/>
                  <span className="text-[#f400b0] font-bold">-1 점</span>을
                  받습니다.
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
                  <span className="text-[#f400b0]">베스킨라빈스 31 </span>{" "}
                  가이드
                </div>
                <div>
                  <img src="/img/베라1.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  주어진 턴에 맞게 숫자 3개중
                  <span className="text-[#f400b0] font-bold"> 선택 </span>
                  하여 제출하시면 됩니다.
                </h1>
              </>
            ),
          },
          {
            content: (
              <>
                <div className="text-4xl text-center m-5">
                  <span className="text-[#f400b0]">베스킨라빈스 31 </span>{" "}
                  가이드
                </div>
                <div>
                  <img src="/img/베라3.png" className="h-96 mx-auto"></img>
                </div>
                <h1 className="px-10 text-2xl mt-5 text-start">
                  <span className="text-[#f400b0] font-bold">
                    31 또는 그 이상의 숫자 
                  </span>
                  <br/>클릭 시 선택한 유저가 패배합니다.
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
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l"
          >
            이전
          </button>
          <button
            onClick={nextModal}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-r ${
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
