import React from "react";

function GameGuide({ openModal }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-between w-full pt-20 pb-20 transition-transform duration-500">
        <img
          src="./img/Landing/ImageGameGuide.webp"
          alt=""
          id="3"
          onClick={openModal}
          className="cursor-pointer h-[25vw] w-[13.3vw] rounded-2xl object-cover transition-transform duration-500 hover:scale-110"
        />
        <img
          src="./img/Landing/CatchMindGuide.webp"
          alt=""
          id="4"
          onClick={openModal}
          className="cursor-pointer h-[25vw] w-[13.3vw] rounded-2xl object-cover transition-transform duration-500 hover:scale-110"
        />
        <img
          src="./img/Landing/ShoutInSilenceGuide.webp"
          alt=""
          id="5"
          onClick={openModal}
          className="cursor-pointer h-[25vw] w-[13.3vw] rounded-2xl object-cover transition-transform duration-500 hover:scale-110"
        />
        <img
          src="./img/Landing/PersonQuizGuide.webp"
          alt=""
          id="6"
          onClick={openModal}
          className="cursor-pointer h-[25vw] w-[13.3vw] rounded-2xl object-cover transition-transform duration-500 hover:scale-110"
        />
        <img
          src="./img/Landing/LotteryGuide.webp"
          alt=""
          id="7"
          onClick={openModal}
          className="cursor-pointer h-[25vw] w-[13.3vw] rounded-2xl object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
    </div>
  );
}

export default GameGuide;
