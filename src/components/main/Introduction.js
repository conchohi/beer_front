import React from "react";
import Beer1 from "../animation/Beer1";

const Introduction = () => {
  return (
    <div
      className=" text-white rounded-lg p-16 sm:p-20 my-10 mx-5 sm:mx-10 h-fit flex min-h-[50vh]"
      id="firstpage"
    >
      <div className="w-full xl:w-2/3 lg:w-1/2 flex flex-col font-bold">
        <p
          className="text-[2rem] lg:text-[2.5rem] mb-4 sm:mb-8"
          id="serviceintro"
        >
          서비스 소개
        </p>
        <p className="m-0 text-[4rem] lg:text-[5rem] bg-gradient-to-r from-[#ffd82d] to-[#ffffff] bg-clip-text text-transparent w-fit">
          우리집 Beer
        </p>
        <p className="m-0 text-[2rem] lg:text-[3rem] font-normal">
          화상을 통한 술모임
        </p>
        <div className="flex flex-row justify-between mt-4 sm:mt-8">
          <div className="flex flex-col justify-center mt-2 mb-0 font-light text-[1rem] lg:text-[1.5rem] leading-[200%]">
            우리집 비어는 집에서 편안하게 술을 즐길 수 있도록 도와주는 온라인
            플랫폼입니다. 화상 통화 기능을 통해 같은 공간에서 술을 마시는 것
            같은 경험을 제공합니다.
          </div>
        </div>
      </div>
      <div className="w-1/3 xl:w-1/2 hidden lg:flex justify-center items-center">
        <Beer1 />
      </div>
    </div>
  );
};

export default Introduction;
