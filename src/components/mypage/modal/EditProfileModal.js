import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Draggable from "react-draggable";
import axios from "axios";

const EditProfileModal = ({ isOpen, onRequestClose, userData }) => {
  const [image, setImage] = useState(userData?.profileImage || null);
  const [nickname, setNickname] = useState(userData?.nickname || "");
  const [name, setName] = useState(userData?.name || "");
  const [mbti, setMbti] = useState(userData?.mbti || "");
  const [age, setAge] = useState(userData?.age || "");
  const [intro, setIntro] = useState(userData?.intro || "");

  useEffect(() => {
    if (userData) {
      setNickname(userData.nickname);
      setName(userData.name);
      setMbti(userData.mbti);
      setAge(userData.age);
      setIntro(userData.intro);
      setImage(userData.profileImage);
    }
  }, [userData]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access");
      const nickname = localStorage.getItem("nickname");
      const updatedUser = {
        nickname,
        name,
        mbti,
        age,
        intro,
        profileImage: image,
      };

      const response = await axios.put(`http://localhost:8080/api/user/update/${nickname}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        onRequestClose();
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Profile Modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <Draggable>
        <div className="bg-black p-8 rounded-lg border-2 border-pink-500 w-full max-w-4xl mx-auto text-white cursor-move">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-pink-500">정보 수정</h2>
            <button onClick={onRequestClose} className="text-pink-500 text-2xl">&times;</button>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-4">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  프로필 이미지
                </label>
                <label htmlFor="file-input">
                  <img
                    src={image || userData?.profileImage || "/logo/basic.png"}
                    alt="Preview"
                    className="mb-4 w-full h-auto rounded-lg cursor-pointer"
                  />
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
            <div className="w-1/2 pl-4">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  닉네임
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  이름
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  MBTI
                </label>
                <input
                  type="text"
                  value={mbti}
                  onChange={(e) => setMbti(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  나이
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  한줄소개
                </label>
                <textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSave}
            >
              저장
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onRequestClose}
            >
              취소
            </button>
          </div>
        </div>
      </Draggable>
    </Modal>
  );
};

export default EditProfileModal;
