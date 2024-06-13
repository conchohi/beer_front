import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import EditProfileModal from "./modal/EditProfileModal.js";
import { API_SERVER_HOST } from "../../api/axios_intercepter.js";

// React Modal's root element setting
Modal.setAppElement("#root");

function ProfilePageInfo({ handleOpen, userData }) {
  const [modalOn, setModalOn] = useState(false);
  const [userDetails, setUserDetails] = useState(userData);

  useEffect(() => {
    setUserDetails(userData);
  }, [userData]);

  const openModal = () => {
    setModalOn(true);
  };

  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around p-2">
      <div className="flex flex-col justify-center items-center w-2/5 mb-3">
        <img className="w-48 h-48 rounded-full border-4 border-transparent" alt={userDetails.profileImage} src={`${API_SERVER_HOST}/api/user/${userDetails.profileImage}`}/>
        <button
          className="mt-5 bg-pink-500 text-white rounded-lg w-32 h-12 text-lg cursor-pointer"
          onClick={openModal}
        >
          정보 수정
        </button>
      </div>
      <div className="flex flex-col justify-center items-start gap-6 w-3/4">
        <div className="w-full text-lg">
          <div className="flex flex-wrap items-center">
            <div className="flex flex-1 items-center">
              <div className="ml-5 flex items-center justify-center w-100 h-12  rounded-3xl px-6 bg-pink-500 text-white">
                닉네임
              </div>
              <div className="ml-4 text-gray-600"> {userDetails?.nickname || "비공개"}</div>
            </div>
            <div className="flex flex-1 items-center mt-2 lg:mt-0">
              <div className="ml-5 flex items-center justify-center w-50 h-12 rounded-3xl px-6 bg-pink-500 text-white">
                성별
              </div>
              <div className="ml-4 text-gray-600"> {userDetails?.gender || "비공개"}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-4 lg:mt-6">
            <div className="flex flex-1 items-center">
              <div className="ml-5 flex items-center justify-center w-50 h-12 rounded-3xl px-6 bg-pink-500 text-white">
                MBTI
              </div>
              <div className="ml-4 text-gray-600"> {userDetails?.mbti || "비공개"}</div>
            </div>
            <div className="flex flex-1 items-center mt-2 lg:mt-0">
              <div className="ml-5 flex items-center justify-center w-50 h-12  rounded-3xl px-6 bg-pink-500 text-white">
                나이
              </div>
              <div className="ml-4 text-gray-600"> {userDetails?.age || "비공개"}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-4 lg:mt-6">
            <div className="flex flex-1 items-center">
              <div className="ml-5 flex items-center justify-center w-1/4 h-12  rounded-3xl px-6 bg-pink-500 text-white">
                한줄소개
              </div>
              <div className="w-3/4 ml-4 bg-white text-gray-600">
                    {userDetails?.intro || "자기소개를 작성해주세요"}
              </div>  
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EditProfileModal 
        isOpen={modalOn} 
        onRequestClose={closeModal} 
        userData={userDetails}
        onUpdateUserData={setUserDetails}
      />
    </div>
  );
}

export default ProfilePageInfo;
