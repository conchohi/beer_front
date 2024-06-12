import React, { useEffect, useState } from "react";
import privateApi from "../../../../api/axios_intercepter";
import AlertModal from "./FriendCommonModal";
import Draggable from "react-draggable";
import Space2 from "../../../animation/Space2";

const FriendRequestsModal = ({ show, closeModal, onFriendAccepted }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertShow, setAlertShow] = useState(false);

  useEffect(() => {
    if (show) {
      fetchFriendRequests();
    }
  }, [show]);

  const fetchFriendRequests = async () => {
    try {
      const response = await privateApi.get("/api/friend/requests");
      setFriendRequests(response.data);
    } catch (error) {
      console.error("친구 요청을 가져오는 중 에러 발생:", error);
    }
  };

  const acceptFriendRequest = async (nickname) => {
    try {
      await privateApi.post("/api/friend/accept", { nickname });
      setFriendRequests(friendRequests.filter((req) => req.nickname !== nickname));
      setAlertMessage("친구 요청을 수락했습니다!");
      setAlertShow(true);
      onFriendAccepted(); // Trigger the refresh
      closeModal(); // Close the modal
    } catch (error) {
      console.error("친구 요청을 수락하는 중 에러 발생:", error);
      setAlertMessage("친구 요청을 수락하는 데 에러가 발생했습니다");
      setAlertShow(true);
    }
  };

  const declineFriendRequest = async (nickname) => {
    try {
      await privateApi.post("/api/friend/decline", { nickname });
      setFriendRequests(friendRequests.filter((req) => req.nickname !== nickname));
      setAlertMessage("친구 요청을 거절했습니다!");
      setAlertShow(true);
      closeModal(); // Close the modal
    } catch (error) {
      console.error("친구 요청을 거절하는 중 에러 발생:", error);
      setAlertMessage("친구 요청을 거절하는 데 에러가 발생했습니다");
      setAlertShow(true);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <Draggable>
      <div
        className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
          show ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="bg-gray-800 text-white rounded-lg p-8 w-full max-w-md mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-pink-500">친구 요청 목록</h2>
            <button className="text-white text-2xl" onClick={closeModal}>
              ✖
            </button>
          </div>
          {friendRequests.length > 0 ? (
            <ul>
              {friendRequests.map((user) => (
                <li
                  key={user.userId}
                  className="flex justify-between items-center text-xl p-2 border-b border-gray-700"
                >
                  <span>{user.nickname}</span>
                  <div>
                    <button
                      className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 mr-2"
                      onClick={() => acceptFriendRequest(user.nickname)}
                    >
                      수락
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      onClick={() => declineFriendRequest(user.nickname)}
                    >
                      거절
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-xl text-white mt-4">
              친구 요청 목록이 없습니다.
              <Space2 />
            </div>
          )}
          <button
            className="bg-gray-700 text-xl text-white px-4 py-2 rounded mt-4 w-full hover:bg-gray-600"
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
        <AlertModal
          show={alertShow}
          message={alertMessage}
          onClose={() => setAlertShow(false)}
        />
      </div>
    </Draggable>
  );
};

export default FriendRequestsModal;
