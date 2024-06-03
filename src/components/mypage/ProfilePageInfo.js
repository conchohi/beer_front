import { useState } from "react";
import Modal from "react-modal";
import EditProfileModal from "./EditProfileModal";

// React Modal의 root element 설정
Modal.setAppElement("#root");

function ProfilePageInfo({ handleOpen }) {
  // 모달 표시를 위한 함수
  const [modalOn, setModalOn] = useState(false);
  const openModal = () => {
    setModalOn(true);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around p-4">
      <div className="flex flex-col justify-center items-center gap-6 mb-6 lg:mb-0">
        <img
          alt=""
          className="w-36 h-36 md:w-48 md:h-48 lg:w-72 lg:h-72 rounded-full border-4 border-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-origin-border bg-clip-content"
        />
        <button
          className="bg-pink-500 text-white rounded-lg w-32 h-12 md:w-40 md:h-16 lg:w-40 lg:h-20 text-lg md:text-xl cursor-pointer"
          onClick={openModal}
        >
          정보 수정
        </button>
      </div>
      <div className="flex flex-col justify-center items-start gap-4 w-full">
        <div className="table w-full text-2xl md:text-4xl lg:text-6xl">
          <div className="table-row-group">
            <div className="table-row">
              <div className="table-cell pr-4 lg:pr-10 text-pink-500">닉네임 :</div>
              <div className="table-cell pr-4 lg:pr-10 ml-2">홍길동</div> 
              <div className="table-cell pr-4 lg:pr-10 text-pink-500">성명 :</div>
              <div className="table-cell ml-2">비공개</div> 
            </div>
            <br />
            <div className="table-row mt-4">
              <div className="table-cell pr-4 lg:pr-10 text-pink-500">MBTI :</div>
              <div className="table-cell pr-4 lg:pr-10 ml-2">ENFP</div> 
              <div className="table-cell pr-4 lg:pr-10 text-pink-500">나이 :</div>
              <div className="table-cell ml-2">20</div> 
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      <EditProfileModal isOpen={modalOn} onRequestClose={closeModal} />
    </div>
  );
}

export default ProfilePageInfo;
