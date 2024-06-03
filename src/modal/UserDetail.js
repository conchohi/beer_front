import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { SlUserFollow } from "react-icons/sl";
import { AiFillAlert } from "react-icons/ai";

// const UserDetail = ({ isOpen, onClose, userId }) => {
//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//     if (isOpen && userId) {
//       // 여기서 사용자 정보를 불러오는 API 호출을 수행합니다.
//       fetch(`/api/user/${userId}`)
//         .then((response) => response.json())
//         .then((data) => setUserDetails(data))
//         .catch((error) => console.error('Error fetching user details:', error));
//     }
//   }, [isOpen, userId]);

//   if (!isOpen || !userDetails) return null;
function UserDetail(){

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-blue-950 text-white w-96 p-5 rounded-lg shadow-lg relative ">
        {/* 닫기창 */}
        <div className="mb-4">
          <button className="absolute top-2 right-2">
            <AiOutlineClose className=""/>
          </button>
        </div>

        
        <div className="flex items-center ">
          {/* 프로필 이미지 */}
          <div className="w-36 h-48 overflow-hidden">
            <img src = "/imsi.jpg"
              // src={User.profileImage || '기본이미지'} //불러온값
              alt="Profile"
              className=" w-full h-full rounded-lg mr-6 object-cover "/>
          </div>  

          {/* 유저정보유형 */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col justify-between text-right">
              <div className="flex justify-between mb-2 font-semibold px-3 py-1">닉네임</div>
              <div className="flex justify-between mb-2 font-semibold px-3 py-1">MBTI</div>
              <div className="flex justify-between mb-2 font-semibold px-3 py-1">결혼여부</div>
              <div className="flex justify-between mb-2 font-semibold px-3 py-1">성별</div>
              <div className="flex justify-between mb-2 font-semibold px-3 py-1">나이</div>
            </div>
          </div>

          {/* 유저정보 불러온값 */}
          <div className="flex items-center justify-center ">
            <div className="flex flex-col justify-between w-28 text-gray-800">
              <div className="flex justify-between mb-2 bg-white rounded-xl drop-shadow-md px-3 py-1"> 얄라리 </div>
              <div className="flex justify-between mb-2 bg-white rounded-xl drop-shadow-md px-3 py-1"> ENFP </div>
              <div className="flex justify-between mb-2 bg-white rounded-xl drop-shadow-md px-3 py-1"> 미혼 </div>
              <div className="flex justify-between mb-2 bg-white rounded-xl drop-shadow-md px-3 py-1"> 여 </div>
              <div className="flex justify-between mb-2 bg-white rounded-xl drop-shadow-md px-3 py-1"> 24 </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="mt-2">
            <h3 className="font-semibold">소개글</h3>
          </div>
          <div className="h-20 mt-2 p-3 bg-white rounded-lg drop-shadow-md text-gray-800">
              <div class="">불러온값</div>
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg flex items-center">
            <AiFillAlert className="w-6 h-6 mr-2" /> 신고
          </button>
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center">
            <SlUserFollow className="mr-4" /> 팔로우
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;