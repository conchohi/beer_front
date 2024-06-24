import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../../../../layouts/ModalLayout";
import ImageEditDisplay from "../../image/ImageEditDisplay";
import ChangeNicknameModal from "./ChangeNicknameModal";
import CheckEmailModal from "./CheckEmailModal";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";
import privateApi from "../../../../api/axios_intercepter";

const EditProfileModal = ({
  isOpen,
  onRequestClose,
  userData,
  onUpdateUserData,
}) => {
  const [imageFile, setImageFile] = useState(null); 
  const [imageUrl, setImageUrl] = useState(userData?.profileImage || ""); 
  const [nickname, setNickname] = useState(userData?.nickname || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [mbti, setMbti] = useState(userData?.mbti || "");
  const [age, setAge] = useState(userData?.age || "");
  const [intro, setIntro] = useState(userData?.intro || "");
  const [gender, setGender] = useState(userData?.gender || ""); 
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false); 
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false); // 추가된 상태

  const navigate = useNavigate();

  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (userData) {
      setNickname(userData.nickname);
      setEmail(userData.email);
      setMbti(userData.mbti || "");
      setAge(userData.age || 0);
      setIntro(userData.intro  || "");
      setGender(userData.gender  || "");
      setImageUrl(userData.profileImage);
    }
  }, [userData]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userData.userId);
      formData.append("nickname", nickname);
      formData.append("email", email);
      formData.append("mbti", mbti);
      formData.append("age", age);
      formData.append("intro", intro);
      formData.append("gender", gender);

      if (imageFile) {
        formData.append("profileFile", imageFile);
      }

      const response = await privateApi.patch(`/api/user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const updatedData = response.data;
        localStorage.setItem("nickname", nickname);
        onUpdateUserData(updatedData);
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

  const openEmailModal = () => {
    setIsEmailModalOpen(true);
  };

  const closeEmailModal = () => {
    setIsEmailModalOpen(false);
  };

  const handleEmailVerified = (newEmail) => {
    setEmail(newEmail);
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openDeletedModal = () => {
    setIsDeletedModalOpen(true);
  };

  const closeDeletedModal = () => {
    setIsDeletedModalOpen(false);
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    openDeletedModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Profile Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 "
    >
      <ModalLayout>
        <div className="bg-slate-200 p-4 rounded-lg border-2 border-pink-500 w-[600px] mx-auto text-white cursor-move">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-pink-500 text-center">정보 수정</h2>
            <button onClick={onRequestClose} className="text-pink-500 text-2xl">
              &times;
            </button>
          </div>
          <div className="flex">
            <div className="w-2/5 ">
              <div className=" flex flex-col items-center">
                <label htmlFor="file-input">
                  <ImageEditDisplay fileName={imageUrl} />
                </label>
                <label className="block pt-3 text-gray-600 text-base font-bold">
                  프로필 이미지
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
            <div className="w-3/5 pl-4">
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  닉네임
                </label>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  value={nickname}
                  onClick={openNicknameModal}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                  onMouseDown={handleMouseDown}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  이메일
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onClick={openEmailModal}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                  onMouseDown={handleMouseDown}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  패스워드
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value="********"
                  onClick={openPasswordModal}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                  onMouseDown={handleMouseDown}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  MBTI
                </label>
                <select
                  id="mbti"
                  name="mbti"
                  value={mbti}
                  onChange={(e) => setMbti(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">선택안함</option>
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
                  <label className="block text-gray-600 text-sm font-bold mb-2">
                    나이
                  </label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    onMouseDown={handleMouseDown}
                  />
                </div>

                <div className="w-1/2 pl-2 pt-1">
                  <label className="block text-gray-600 text-sm font-bold mb-2">
                    성별
                  </label>
                  <div className="flex text-gray-600">
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
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  소개글
                </label>
                <textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  maxLength={100}
                  placeholder="텍스트 제한 100글자"
                  className="shadow appearance-none border w-full py-2 px-3 rounded-lg resize-none text-black leading-tight focus:outline-none focus:shadow-outline"
                  onMouseDown={handleMouseDown}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onRequestClose}
            >
              취소
            </button>
            <button
              type="button"
              className="bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-pink-700"
              onClick={openDeleteModal}
            >
              회원 탈퇴
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        </div>
      </ModalLayout>
      {isNicknameModalOpen && (
        <ChangeNicknameModal
          isOpen={isNicknameModalOpen}
          onRequestClose={closeNicknameModal}
          currentNickname={nickname}
          onNicknameChange={handleNicknameChange}
        />
      )}
      {isEmailModalOpen && (
        <CheckEmailModal
          isOpen={isEmailModalOpen}
          onRequestClose={closeEmailModal}
          onEmailVerified={handleEmailVerified}
        />
      )}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onRequestClose={closePasswordModal}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteAccountModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          onDeleted={handleDeleteAccount}
        />
      )}
      {isDeletedModalOpen && (
        <Modal
          isOpen={isDeletedModalOpen}
          onRequestClose={closeDeletedModal}
          contentLabel="Account Deleted Modal"
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0"
        >
          <ModalLayout>
            <div className="bg-slate-200 p-8 rounded-lg border-2 border-pink-500 w-full max-w-md mx-auto text-white">
              <h2 className="text-xl text-pink-500 mb-4">계정 삭제</h2>
              <p className="text-black mb-4">계정이 성공적으로 삭제되었습니다.</p>
              <button
                onClick={closeDeletedModal}
                className="bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-pink-700"
              >
                확인
              </button>
            </div>
          </ModalLayout>
        </Modal>
      )}
    </Modal>
  );
};

export default EditProfileModal;
