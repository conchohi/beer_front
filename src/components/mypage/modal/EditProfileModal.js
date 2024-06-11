import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Draggable from "react-draggable";
import privateApi from "../../../api/axios_intercepter";
import ChangeNicknameModal from "./ChangeNicknameModal"; // New component for changing nickname
import ImageDisplay from "../ImageDisplay"; // Import ImageDisplay component

const EditProfileModal = ({ isOpen, onRequestClose, userData, onUpdateUserData }) => {
  const [imageFile, setImageFile] = useState(null); // New state for the file
  const [nickname, setNickname] = useState(userData?.nickname || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [mbti, setMbti] = useState(userData?.mbti || "");
  const [age, setAge] = useState(userData?.age || "");
  const [intro, setIntro] = useState(userData?.intro || "");
  const [gender, setGender] = useState(userData?.gender || ""); // New state for gender
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      setNickname(userData.nickname);
      setEmail(userData.email);
      setMbti(userData.mbti);
      setAge(userData.age);
      setIntro(userData.intro);
      setGender(userData.gender); // Initialize gender state
    }
  }, [userData]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]); // Store the file for upload
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("userDto", new Blob([JSON.stringify({
        nickname,
        email,
        mbti,
        age,
        intro,
        gender
      })], { type: "application/json" }));
      if (imageFile) {
        formData.append("profileFile", imageFile); // Append the file to the form data
      }

      const response = await privateApi.put(`/api/user/update/${nickname}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Specify the correct content type
        },
      });

      if (response.status === 200) {
        onUpdateUserData(response.data); // Immediately reflect changes in ProfilePageInfo
        onRequestClose();
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const openNicknameModal = () => {
    setIsNicknameModalOpen(true);
  };

  const closeNicknameModal = () => {
    setIsNicknameModalOpen(false);
  };

  const handleNicknameChange = (newNickname) => {
    setNickname(newNickname);
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
                  <ImageDisplay fileName={userData?.profileImage} /> {/* Use ImageDisplay component */}
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
                  onClick={openNicknameModal}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  MBTI
                </label>
                <select
                  id="mbti"
                  name="mbti"
                  value={mbti}
                  onChange={(e) => setMbti(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 placeholder-gray-400 py-2 px-3 text-pink-500"
                >
                  <option value="">MBTI</option>
                  <option value="INTJ">INTJ</option>
                  <option value="INTP">INTP</option>
                  <option value="ENTJ">ENTJ</option>
                  <option value="ENTP">ENTP</option>
                  <option value="INFJ">INFJ</option>
                  <option value="INFP">INFP</option>
                  <option value="ENFJ">ENFJ</option>
                  <option value="ENFP">ENFP</option>
                  <option value="ISTJ">ISTJ</option>
                  <option value="ISFJ">ISFJ</option>
                  <option value="ESTJ">ESTJ</option>
                  <option value="ESFJ">ESFJ</option>
                  <option value="ISTP">ISTP</option>
                  <option value="ISFP">ISFP</option>
                  <option value="ESTP">ESTP</option>
                  <option value="ESFP">ESFP</option>
                </select>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
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
                <div className="w-1/2 pl-2">
                  <label className="block text-white text-sm font-bold mb-2">
                    성별
                  </label>
                  <div className="flex">
                    <label className="mr-4">
                      <input
                        type="radio"
                        value="남자"
                        checked={gender === "남자"}
                        onChange={() => setGender("남자")}
                        className="mr-2"
                      />
                      남자
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="여자"
                        checked={gender === "여자"}
                        onChange={() => setGender("여자")}
                        className="mr-2"
                      />
                      여자
                    </label>
                  </div>
                </div>
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
              className="bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-pink-700"
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
      {isNicknameModalOpen && (
        <ChangeNicknameModal
          isOpen={isNicknameModalOpen}
          onRequestClose={closeNicknameModal}
          currentNickname={nickname}
          onNicknameChange={handleNicknameChange}
        />
      )}
    </Modal>
  );
};

export default EditProfileModal;
