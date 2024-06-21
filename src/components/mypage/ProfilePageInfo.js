import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { API_SERVER_HOST } from "../../api/axios_intercepter.js";
import EditProfileModal from "./modal/profile/EditProfileModal.js";

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
      <div className="flex flex-col justify-center items-center lg:w-4/12 mb-3 lg:mb-0">
        <img
          className="w-36 h-36 lg:w-48 lg:h-48 rounded-full border-2 border-pink-400"
          alt={userDetails.profileImage}
          src={`${API_SERVER_HOST}/api/user/${userDetails.profileImage}`}
        />
        <div
          className="mt-3 text-pink-300 rounded-lg w-25 h-10 text-base cursor-pointer flex justify-center items-center"
          onClick={openModal}
        >
          정보 수정
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-6 lg:w-8/12">
        <div className="w-full text-lg">
          <div className="flex flex-wrap items-center">
            <div className="flex flex-1 items-center">
              <div className="ml-3 flex items-center justify-center px-4 lg:px-6 text-lg lg:text-xl border-b-2 border-gray-300 text-pink-300">
                닉네임
              </div>
              <div className="ml-3 border-b-4 border-white text-black">
                {userDetails?.nickname || "비공개"}
              </div>
            </div>
            <div className="flex flex-1 items-center lg:mt-0">
              <div className="ml-3 flex items-center justify-center px-4 lg:px-6 text-lg lg:text-xl border-b-2 border-gray-300 text-pink-300">
                성별
              </div>
              <div className="ml-4 border-b-4 border-white text-black">
                {userDetails?.gender || "비공개"}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-4 lg:mt-6">
            <div className="flex flex-1 items-center">
              <div className="ml-3 flex items-center justify-center px-4 lg:px-6 text-lg lg:text-xl border-b-2 border-gray-300 text-pink-300">
                MBTI
              </div>
              <div className="ml-4 text-black">
                {userDetails?.mbti || "비공개"}
              </div>
            </div>
            <div className="flex flex-1 items-center lg:mt-0">
              <div className="ml-3 flex items-center justify-center px-4 lg:px-6 text-lg lg:text-xl border-b-2 border-gray-300 text-pink-300">
                나이
              </div>
              <div className="ml-4 text-black">
                {userDetails?.age || "비공개"}
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-3 lg:mt-6 p-4 w-11/12 bg-slate-100 shadow-sm rounded-lg">
            <div className="px-4 text-lg lg:text-xl  text-pink-300 border-b-2 border-gray-300">
              소개글
            </div>
            <div className="mt-2 px-4 py-2 text-gray-600">
              {userDetails?.intro || "자기소개를 작성해주세요"}
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
