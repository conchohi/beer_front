import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PasswordModalComponent from "./modal/PasswordModalComponent";
import BasicModalComponent from "../common/BasicModalComponent";

const ChatCard = ({ chat }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const token = localStorage.getItem("access");

  const moveToChat = () => {
    if (!token) {
      setOpenModal(true);
      return;
    }

    if (chat.roomPw) {
      setPasswordModal(true);
    } else {
      navigate(`/chat/${chat.roomNo}`);
    }
  };

  return (
    <>
      {openModal && (
        <BasicModalComponent
          message="로그인 후 이용 가능합니다."
          callbackFunction={() => {
            navigate(`/login`);
          }}
        />
      )}
      {passwordModal && (
        <PasswordModalComponent
          roomNo={chat.roomNo}
          close={() => {
            setPasswordModal(false);
          }}
        />
      )}
      <div
        className="flex flex-col bg-white w-full max-w-sm mx-auto py-5 px-5 my-5 rounded-2xl shadow-lg cursor-pointer transition-transform transform hover:scale-105"
        onClick={moveToChat}
      >
        <div className="relative">
          <img
            className="w-full h-56 object-cover rounded-t-2xl"
            src={`/img/chatlist/${chat.category}.PNG`}
            alt={chat.category}
          />
        </div>
        <div className="flex flex-col p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500 text-sm font-medium">
              {chat.category}
            </span>
            <span className="text-gray-600 text-sm">{chat.master}</span>
          </div>
          <p className="font-bold text-2xl text-gray-800 mb-1 flex justify-between ">{chat.title} {chat.roomPw && (
            <FaLock className="text-gray-700" />
          )}</p>
          <div className="flex justify-between text-base text-gray-400">
            <span>{chat.createDate}</span>
            <span
              className={`flex items-center gap-1 ${
                chat.currentUser === chat.maximumUser
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              <FaUser
                className={`${
                  chat.currentUser === chat.maximumUser
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              />
              {`${chat.currentUser}/${chat.maximumUser}`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatCard;
