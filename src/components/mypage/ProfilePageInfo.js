import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import EditProfileModal from "./modal/EditProfileModal.js";
import ImageDisplay from "./image/ImageDisplay.js";

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

  const handleUpdateUserData = (updatedData) => {
    // Create a unique URL for the updated image
    if (updatedData.profileImage) {
      updatedData.profileImage += `?timestamp=${new Date().getTime()}`;
    }
    setUserDetails(updatedData);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around p-4">
      <div className="flex flex-col justify-center items-center">
        <ImageDisplay fileName={userDetails?.profileImage} />
        <button
          className="mt-5 bg-pink-500 text-white rounded-lg w-32 h-12 md:w-40 md:h-16 lg:w-40 lg:h-20 text-lg md:text-xl cursor-pointer"
          onClick={openModal}
        >
          정보 수정
        </button>
      </div>
      <div className="flex flex-col justify-center items-start gap-6 w-full">
        <div className="w-full text-2xl">
          <div className="flex flex-wrap items-center">
            <div className="flex flex-1 items-center">
              <div className="ml-20 flex items-center justify-center w-50 h-16 md:w-20 md:h-20 lg:w-36 lg:h-24 rounded-full bg-pink-500 text-white">
                닉네임
              </div>
              <div className="ml-2">: {userDetails?.nickname || "비공개"}</div>
            </div>
            <div className="flex flex-1 items-center mt-2 lg:mt-0">
              <div className="ml-20 flex items-center justify-center w-50 h-16 md:w-20 md:h-20 lg:w-36 lg:h-24 rounded-full bg-pink-500 text-white">
                성별
              </div>
              <div className="ml-2">: {userDetails?.gender || "비공개"}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4 lg:mt-6">
            <div className="flex flex-1 items-center">
              <div className="ml-20 flex items-center justify-center w-50 h-16 md:w-20 md:h-20 lg:w-36 lg:h-24 rounded-full bg-pink-500 text-white">
                MBTI
              </div>
              <div className="ml-2">: {userDetails?.mbti || "비공개"}</div>
            </div>
            <div className="flex flex-1 items-center mt-2 lg:mt-0">
              <div className="ml-20 flex items-center justify-center w-50 h-16 md:w-20 md:h-20 lg:w-36 lg:h-24 rounded-full bg-pink-500 text-white">
                나이
              </div>
              <div className="ml-2">: {userDetails?.age || "비공개"}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4 lg:mt-6">
            <div className="flex flex-1 items-center">
              <div className="ml-20 flex items-center justify-center w-50 h-16 md:w-20 md:h-20 lg:w-44 lg:h-24 rounded-full bg-pink-500 text-white">
                한줄소개
              </div>
              <textarea 
                className="ml-2 bg-black w-full" 
                readOnly
                value={userDetails?.intro || "자기소개를 작성해주세요"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EditProfileModal 
        isOpen={modalOn} 
        onRequestClose={closeModal} 
        userData={userDetails}
        onUpdateUserData={handleUpdateUserData}
      />
    </div>
  );
}

export default ProfilePageInfo;
