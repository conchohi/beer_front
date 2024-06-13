import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { SlUserFollow } from "react-icons/sl";
import { AiFillAlert } from "react-icons/ai";
import Draggable from "react-draggable";
import ReportUser from "./ReportUser";
import { getUserByNickname } from "../../../api/userApi";
import BasicModalComponent from "../../common/BasicModalComponent";
import privateApi, { API_SERVER_HOST } from "../../../api/axios_intercepter"; // API_SERVER_HOST 추가

function UserDetail({ nickname, close }) {
  const [userInfo, setUserInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [report, setReport] = useState(false);
  const myNickname = localStorage.getItem('nickname');

  const handleReport = () => {
    if(myNickname && myNickname === nickname){
      setMessage('본인은 신고할 수 없습니다.')
      setOpenModal(true);
      return;
    }
    setReport(!report);
  };

  const handleFriend = async () => {
    try {
      await privateApi.post(`/api/friend/request`, { nickname });
      setMessage('친구 요청을 보냈습니다!');
      setOpenModal(true);
    }catch (error) {
        if (error.response && error.response.data) {
          setMessage(error.response.data)
        } else {
          setMessage('팔로우 실패: 서버 오류');
        }
        setOpenModal(true);
        console.error("Error following user:", error);
      }
    };

  useEffect(() => {
    getUserByNickname(nickname).then(result => {
      setUserInfo(result);}
    )
  }, [nickname])

  return (
    <>
      {openModal && <BasicModalComponent message={message} callbackFunction={()=>{setOpenModal(false)}}/>}
      {report && <ReportUser user={userInfo} setMessage={setMessage} setOpenModal={setOpenModal} close={handleReport} />}
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
                <img src={userInfo.profileImage ? `${API_SERVER_HOST}/api/user/${userInfo.profileImage}` :`/imsi.jpg`}

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

            <div className="mt-5 flex justify-between items-center">
              <button className="bg-red-600 text-white py-2 px-4 rounded-lg flex items-center" onClick={handleReport}>
                <AiFillAlert className="w-6 h-6 mr-2" /> 신고
              </button>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center" onClick={handleFriend}>
                <SlUserFollow className="mr-4" /> 친구 추가
              </button>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
};

export default UserDetail;
