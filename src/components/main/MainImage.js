import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainImage = ({ clickDown }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      // 애니메이션이 끝난 후 실행할 코드 (예: 페이지 이동)
      setIsClicked(false);
    }, 1000); // 애니메이션 시간 (1초)
    navigate("/chat/list");
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 pb-20 w-full">
      <img
        src="/img/mainImage.png"
        alt="Main"
        className="w-1/2 animated-zoom"
      />{" "}
      <img src="/img/title.png" alt="Title" className="w-3/12" />
      <button
        className={`bg-gray-900 bg-opacity-40 text-white px-10 py-4 mt-6 rounded-lg font-semibold neon-button ${
          isClicked ? "spin-and-disappear" : ""
        }`}
        onClick={handleClick}
      >
        입장하기
      </button>
      <div className="mt-10 text-white text-lg"></div>
      <div className="animate-bounce mt-2 cursor-pointer" onClick={clickDown}>
        <svg
          className="w-12 h-12 text-white"
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
    </div>
  );
};

export default MainImage;
