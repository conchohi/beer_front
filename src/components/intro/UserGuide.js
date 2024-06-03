import React from "react";

function UserGuide({ openModal }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-between w-full pt-20 pb-20 transition-transform duration-500">
        <img
          src="./img/Landing/GameGuide.webp"
          alt=""
          id="0"
          onClick={openModal}
          className="cursor-pointer h-[25vw] w-auto transition-transform duration-500 hover:scale-110"
        />
        <img
          src="./img/Landing/PhotoGuide.webp"
          alt=""
          id="1"
          onClick={openModal}
          className="cursor-pointer h-[25vw] w-auto transition-transform duration-500 hover:scale-110"
        />
        <img
          src="./img/Landing/ChattingGuide.webp"
          alt=""
          id="2"
          onClick={openModal}
          className="cursor-pointer h-[25vw] w-auto transition-transform duration-500 hover:scale-110"
        />
      </div>
    </div>
  );
}

export default UserGuide;
