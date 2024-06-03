import React from 'react';
import { CgProfile } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";

function CreateRoom() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">

        {/* 닫기버튼 */}
        <div className="absolute top-4 right-4">
            <button className=" text-pink-500">
                <AiOutlineClose className=""/>
            </button>
        </div>

        <div className="w-full md:w-3/5 space-y-4">
          <h2 className="text-pink-500 text-2xl mb-4 font-semibold ">방 만들기</h2>
          <div className="mb-4">
            <label className="block text-gray-300 font-semibold">방 제목</label>
            <input type="text" placeholder="방 제목을 입력하세요" 
              className="w-full p-2 mt-2 rounded-lg bg-gray-700  text-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-semibold">관심사</label>
            <select 
              className="w-full p-2 mt-2 rounded-lg bg-gray-700 text-gray-300 focus:ring-1 focus:ring-pink-500 focus:border-pink-500">
              <option>선택하세요</option>
              <option value="favorite">운동</option>
              <option value="favorite">음악</option>
              <option value="favorite">요리</option>
              <option value="favorite">주식</option>
              <option value="favorite">미용</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-semibold">인원수</label>
            <div className="flex mt-2 space-x-2">
              {[2, 3, 4, 5, 6].map((num) => (
                <button 
                  key={num} 
                  className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">비밀번호(선택)</label>
            <input 
              type="password" 
              placeholder="방 비밀번호를 입력하세요." 
              className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
        </div>

        {/* 카메라설정 */}
        
        <div className=" flex flex-col items-center justify-between w-full md:w-2/5 space-y-4 ml-5">
          <div className="bg-gray-700 w-44 h-44 rounded-lg flex flex-col items-center justify-center mt-5">
            <div className="bg-gray-600 w-24 h-24 rounded-full flex items-center justify-center">
              <CgProfile className="w-full h-full rounded-lg object-cover" />
            </div>
            <p className="text-gray-300 mt-2">카메라 출력 화면</p>
          </div>
          <div className="flex space-x-4">
            <button className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
              <FaVideo className="text-pink-500"/>
            </button>
            <button className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
              <FaMicrophone className="text-pink-500"/>
            </button>
          </div>
          <div className="mt-4">
            <button className=" px-6 py-3 bg-pink-500 text-white rounded-lg">생성</button>
          </div>
        </div>
        

      </div>
    </div>
  );
}

export default CreateRoom;