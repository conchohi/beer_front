import React from 'react';
import Beer1 from '../animation/Beer1';

const Introduction = () => {
  return (
    
    <div className="bg-[#222222] text-white rounded-lg p-16 sm:p-20 my-10 mx-5 sm:mx-10 h-fit flex flex-col min-h-[50vh]" id="firstpage">
    <p className="text-[2rem] sm:text-[2.5rem] mb-4 sm:mb-8" id="serviceintro">서비스 소개</p>
    <p className="m-0 text-[4.8rem] sm:text-[6.8rem] bg-gradient-to-r from-[#8f00ff] to-[#f400b0] bg-clip-text text-transparent w-fit">
      우리집 Beer
    </p>
    <p className="m-0 text-[3rem] sm:text-[4.5rem]">화상을 통한 술모임</p>
    <div className="flex flex-row justify-between mt-4 sm:mt-8">
      <div className="flex flex-col justify-center mt-2 mb-0 font-light text-[1.8rem] sm:text-[2.5rem] w-[50%] leading-[200%]">
      우리집비어는 집에서 편안하게 술을 즐길 수 있도록 도와주는 온라인 플랫폼입니다. 
          화상 통화 기능을 통해 같은 공간에서 술을 마시는 것 같은 
          경험을 제공합니다.
      </div>
      <Beer1 />
    </div>
  </div>
  );
}

export default Introduction;
