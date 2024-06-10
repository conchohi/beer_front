import React, { useState } from "react";
import Modal from "react-modal";
import EditProfileModal from "./modal/EditProfileModal";

// React Modal's root element setting
Modal.setAppElement("#root");

function ProfilePageInfo({ handleOpen, userData }) {
  const [modalOn, setModalOn] = useState(false);
  const openModal = () => {
    setModalOn(true);
  };

  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around p-4">
      <div className="flex flex-col justify-center items-center">
        <img
          src={userData.profileImage || "/logo/basic.png"}
          className="w-36 h-36 md:w-48 md:h-48 lg:w-72 lg:h-60 rounded-full border-4 border-transparent"
          alt="프로필 이미지"
        />
        <button
          className="mt-5 bg-pink-500 text-white rounded-lg w-32 h-12 md:w-40 md:h-16 lg:w-40 lg:h-20 text-lg md:text-xl cursor-pointer"
          onClick={openModal}
        >
          정보 수정
        </button>
      </div>
      <div className="flex flex-col justify-center items-start gap-6 w-full">
        <div className="w-full text-2xl md:text-4xl lg:text-6xl">
          <div className="flex flex-wrap items-center">
            <div className="flex flex-1 items-center">
              <div className="ml-20 flex items-center justify-center w-50 h-16 md:w-20 md:h-20 lg:w-36 lg:h-24 rounded-full bg-pink-500 text-white">
                닉네임
              </div>
              <div className="ml-2">: {userData.nickname}</div>
            </div>
            <div className="flex flex-1 items-center mt-2 lg:mt-0">
              <div className="ml-20 flex items-center justify-center w-50 h-16 md:w-20 md:h-20 lg:w-36 lg:h-24 rounded-full bg-pink-500 text-white">
                성별
              </div>
              <div className="ml-2">: {userData.gender}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4 lg:mt-6">
            <div className="flex flex-1 items-center">
              <div className="ml-20 flex items-center justify-center w-50 h-16 md:w-20 md:h-20 lg:w-36 lg:h-24 rounded-full bg-pink-500 text-white">
                Mbti
              </div>
              <div className="ml-2">: {userData.mbti}</div>
            </div>
            <div className="flex flex-1 items-center mt-2 lg:mt-0">
              <div className="ml-20 flex items-center justify-center w-50 h-16 md:w-20 md:h-20 lg:w-36 lg:h-24 rounded-full bg-pink-500 text-white">
                나이
              </div>
              <div className="ml-2">: {userData.age}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4 lg:mt-6">
            <div className="flex flex-1 items-center">
              <div className="ml-20 flex items-center justify-center w-50 h-16 md:w-20 md:h-20 lg:w-44 lg:h-24 rounded-full bg-pink-500 text-white">
                한줄소개
              </div>
              <textarea className="ml-2 bg-black w-full" readOnly>
                안녕하세요
              </textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EditProfileModal isOpen={modalOn} onRequestClose={closeModal} profileImageUrl={userData.profileImage} />
    </div>
  );
}

export default ProfilePageInfo;
