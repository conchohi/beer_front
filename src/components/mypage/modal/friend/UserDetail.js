import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Draggable from "react-draggable";
import { getUserByNickname } from "../../../../api/userApi";
import { API_SERVER_HOST } from "../../../../api/axios_intercepter";

function UserDetail({ nickname, close }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserByNickname(nickname).then(result => {
      setUserInfo(result);}
    )
  }, [nickname])

  return (
    <>
      <Draggable>
        <div className="fixed inset-0 flex items-center justify-center z-30 ">
          <div className="bg-gray-700 text-white w-96 p-5 rounded-lg shadow-lg relative">
            {/* 닫기창 */}
            <div className="mb-4">
              <button className="absolute top-2 right-2" onClick={close}>
                <AiOutlineClose size="25" className="" />
              </button>
            </div>

            <div className="flex items-center ">
              {/* 프로필 이미지 */}
              <div className="w-36 h-36 overflow-hidden object-cover mx-2">
                <img src={`${API_SERVER_HOST}/api/user/${userInfo.profileImage}`}

                  alt="Profile"
                  className=" w-full h-full rounded-lg mr-6 object-cover " />
              </div>

              {/* 유저정보유형 */}
              <div className="flex items-center justify-center">
                <div className="flex flex-col justify-between text-right">
                  <div className="flex justify-between mb-2 font-semibold px-3 py-1 ">닉네임</div>
                   <div className="flex justify-between mb-2 font-semibold px-3 py-1">MBTI</div>
                  <div className="flex justify-between mb-2 font-semibold px-3 py-1">성별</div>
                  <div className="flex justify-between mb-2 font-semibold px-3 py-1">나이</div>
                </div>
              </div>

              {/* 유저정보 불러온값 */}
              <div className="flex items-center justify-center ">
                <div className="flex flex-col justify-between w-28 text-gray-800">
                  <div className="flex justify-between mb-2 bg-white rounded-xl drop-shadow-md px-3 py-1 min-h-[30px]"> {nickname} </div>
                  <div className="flex justify-between mb-2 bg-white rounded-xl drop-shadow-md px-3 py-1 min-h-[30px]"> {userInfo.mbti || '미설정'} </div>
                  <div className="flex justify-between mb-2 bg-white rounded-xl drop-shadow-md px-3 py-1 min-h-[30px]"> {userInfo.gender || '미설정'} </div>
                  <div className="flex justify-between mb-2 bg-white rounded-xl drop-shadow-md px-3 py-1 min-h-[30px]"> {userInfo.age > 0 ? userInfo.age : '미설정'} </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="mt-2">
                <h3 className="font-semibold">한줄 소개</h3>
              </div>
              <div className="h-20 my-2 p-3 bg-white rounded-lg drop-shadow-md text-gray-800">
                <div class="">{userInfo.intro}</div>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
};

export default UserDetail;
