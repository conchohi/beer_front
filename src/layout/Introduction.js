import React from 'react';

const Introduction = () => {
  return (
    <div className="p-10 text-white w-full flex flex-col items-center space-y-6">
      <div className="text-4xl font-bold mb-4 p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-neon text-center">
        우리집 Beer 소개
      </div>
      <div className="text-xl p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-neon text-center">
        화상을 통한 술모임
      </div>
      <div className="mt-4 p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-neon text-center">
        우리집 비어는 집에서 간편하게 화상채팅을 통해 친구들과 술을 먹으며 간단한 게임을 즐길 수 있는 프로젝트입니다.
      </div>
    </div>
  );
}

export default Introduction;
