import React from 'react';

const MainImage = () => {
  return (
    <div className="flex flex-col justify-center items-center p-10 w-full">
        <div className="animated-container">
      <img src="/img/mainImage.png" alt="Main" className="w-1/2 mb-4" />
      </div>
      <button className="bg-gray-800 text-white px-4 py-2 mt-4">참여 하기</button>
      <div className="mt-10 text-white text-lg">스크롤하여 더 보기</div>
      <div className="animate-bounce mt-2">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
}

export default MainImage;
