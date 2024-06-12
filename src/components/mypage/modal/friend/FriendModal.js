import React, { useState, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import privateApi from "../../api/axios_intercepter";
import AlertModal from "./FriendCommonModal"; // 경로는 적절히 수정하세요

const FriendModal = ({ show, closeModal }) => {
  const [friends, setFriends] = useState([]);
  const [friendId, setFriendId] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertShow, setAlertShow] = useState(false);

  // 친구 목록 가져오기
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await privateApi.get("/api/friend/list");
        setFriends(response.data);
      } catch (error) {
        console.error("친구 목록을 가져오는 중 에러 발생:", error);
      }
    };

    fetchFriends();
  }, []);

  // 친구 요청 보내기
  const sendFriendRequest = async () => {
    try {
      await privateApi.post("/api/friend/request", friendId);
      setFriendId("");
      setAlertMessage("친구 요청을 보냈습니다!");
      setAlertShow(true);
    } catch (error) {
      console.error("친구 요청을 보내는 중 에러 발생:", error);
      setAlertMessage("친구 요청을 보내는 데 에러가 발생했습니다");
      setAlertShow(true);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
        show ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
      }`}
      onClick={closeModal}
    >
      <div
        className="bg-gray-800 text-white rounded-lg p-8 w-11/12 md:w-1/2 lg:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">
            친구 <span className="text-pink-500">관리</span>
          </h2>
          <button className="text-2xl text-pink-500" onClick={closeModal}>
            ✖
          </button>
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 rounded bg-gray-700 text-xl text-white placeholder-gray-400 mb-2"
            placeholder="친구 ID 입력"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
          />
          <button
            className="w-full p-2 bg-pink-500 rounded text-white"
            onClick={sendFriendRequest}
          >
            친구 요청 보내기
          </button>
        </div>
        <div className="overflow-y-auto h-64">
          <h3 className="text-2xl mb-4">친구 목록</h3>
          {friends.map((friend) => (
            <div
              key={friend.userId}
              className="flex justify-between items-center p-2 border-b border-gray-700"
            >
              <div className="flex items-center">
                <img
                  src={friend.profileImage}
                  className="w-12 h-12 rounded-full mr-4"
                  alt="Profile"
                />
                <div>
                  <p className="text-lg">{friend.nickname}</p>
                </div>
              </div>
              <FaUserPlus className="text-2xl text-pink-500 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
      <AlertModal
        show={alertShow}
        message={alertMessage}
        onClose={() => setAlertShow(false)}
      />
    </div>
  );
};

export default FriendModal;
