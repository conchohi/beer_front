import React, { useEffect, useState } from "react";
import privateApi, { API_SERVER_HOST } from "../../../../api/axios_intercepter";
import AlertModal from "./FriendCommonModal";
import Space2 from "../../../animation/Space2";
import ModalLayout from "../../../../layouts/ModalLayout";

const FriendRequestsModal = ({ show, closeModal, onFriendAccepted, setClickNickname, onFriendRequestHandled }) => {
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
      onFriendRequestHandled(); // Notify parent to refresh friend requests
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
      onFriendRequestHandled(); // Notify parent to refresh friend requests
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
    <ModalLayout>
      <div
        className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
          show ? "opacity-100 z-20" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="bg-slate-200 text-gray-600 rounded-lg border-2 border-pink-600 p-6 w-full max-w-md mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-pink-500">친구 요청 목록</h2>
            <button className=" text-2xl" onClick={closeModal}>
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
                  <div
                    className="flex items-center cursor-pointer" onClick={() => { setClickNickname(user.nickname) }}
                  >
                    <img
                      src={`${API_SERVER_HOST}/api/user/${user.profileImage}`}
                      className="w-12 h-12 rounded-full mr-4"
                      alt="프로필"
                    />
                    <div>
                      <p className="text-xl">{user.nickname}</p>
                    </div>
                  </div>
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
            <div className="text-center text-xl mt-4">
              친구 요청 목록이 없습니다.
              <Space2 />
            </div>
          )}
          <button
            className="bg-slate-100 text-xl px-4 py-2 rounded mt-4 w-full hover:bg-slate-300"
            onClick={closeModal}
          >
            닫기
          </button>
          <AlertModal
            show={alertShow}
            message={alertMessage}
            onClose={() => setAlertShow(false)}
          />
        </div>
      </div>
    </ModalLayout>
  );
};

export default FriendRequestsModal;
