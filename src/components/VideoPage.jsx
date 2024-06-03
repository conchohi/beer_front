// src/pages/ExamplePage.js
import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate를 import 합니다.

const VideoPage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  // 버튼 클릭 핸들러 함수
  const handleClick = (path) => {
    navigate(path); // 주어진 경로로 이동합니다.
  };

  // 공통 버튼 컴포넌트 생성 함수
  const renderButton = (path, label) => (
    <button
      onClick={() => handleClick(path)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
    >
      {label}
    </button>
  );

  return (
    <div>
      <iframe
        src={`${process.env.PUBLIC_URL}/videoroomtest.html`}
        title="Example"
        width="100%"
        height="800px"
      ></iframe>

      {renderButton("/info", "여기가 궁금하마면 클릭하시오...")}
      {renderButton("/game", "게임이 궁금하면 클릭하시오..")}
    </div>
  );
};

export default VideoPage;
