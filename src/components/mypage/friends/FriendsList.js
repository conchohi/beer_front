import React, { useEffect, useState } from "react";
import { FaUsersSlash, FaSearch, FaEnvelope } from "react-icons/fa";
import privateApi from "../../../api/axios_intercepter";
import FriendsListItem from "./FriendsListItem";
import FriendRequestsModal from "../modal/friend/FriendRequestModal";
import SearchModal from "../modal/search/SearchModal";
import UserDetail from "../modal/friend/UserDetail";
import "./Friendcss.css"; // CSS 파일 임포트

const FriendsList = () => {
  const [friendRequestsOpen, setFriendRequestsOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [clickNickname, setClickNickname] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [hasFriendRequests, setHasFriendRequests] = useState(false);

  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
  }, [refresh]);

  const handleFriendRefresh = () => {
    setRefresh(!refresh);
  };

  const fetchFriends = async () => {
    try {
      const response = await privateApi.get("/api/friend/list");
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await privateApi.get("/api/friend/requests");
      setHasFriendRequests(response.data && response.data.length > 0);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const handleDetail = () => {
    setIsDetail(!isDetail);
    setClickNickname(null);
  };

  useEffect(() => {
    if (clickNickname) {
      setIsDetail(true);
    }
  }, [clickNickname]);

  return (
    <>
      <div className="flex flex-col text-black h-full">
        <div className="flex items-center justify-between h-1/8 p-2 pb-0">
          <div className="text-pink-500 border-b-4 border-gray-300 text-2xl">
            <b>친구 목록</b>
          </div>
          <div className="flex space-x-4">
            <button
              className="text-3xl hover:text-pink-500 transition duration-300 ease-in-out cursor-pointer"
              onClick={() => setSearchModalOpen(true)}
            >
              <FaSearch />
            </button>
            <button
              className={`text-3xl hover:text-pink-500 transition duration-300 ease-in-out cursor-pointer ${hasFriendRequests ? 'shake' : ''}`}
              onClick={() => setFriendRequestsOpen(true)}
            >
              <FaEnvelope />
            </button>
          </div>
        </div>
        {friends.length > 0 ? (
          <div className="max-h-[390px] overflow-y-scroll scrollbar-hide w-full mt-4 overflow-auto rounded-2xl h-full p-2 bg-white">
            {friends.map((friend) => (
              <FriendsListItem
                key={friend.userId}
                friend={friend}
                onFriendDeleted={handleFriendRefresh}
                setClickNickname={setClickNickname}
              />
            ))}
          </div>
        ) : (
          <div className="text-center flex flex-col items-center justify-center h-full mb-10">
            <FaUsersSlash className="text-7xl mx-auto" />
            <div className="mt-12">
              <p className="text-xl font-thin">등록한 친구가 없습니다.</p>
            </div>
          </div>
        )}
      </div>
      {friendRequestsOpen && (
        <FriendRequestsModal
          show={friendRequestsOpen}
          closeModal={() => setFriendRequestsOpen(false)}
          onFriendAccepted={handleFriendRefresh}
          onFriendRequestHandled={() => fetchFriendRequests()} // 친구 요청 상태 갱신
          setClickNickname={setClickNickname}
        />
      )}
      {searchModalOpen && (
        <SearchModal
          show={searchModalOpen}
          closeModal={() => setSearchModalOpen(false)}
          setClickNickname={setClickNickname}
        />
      )}
      {isDetail && <UserDetail nickname={clickNickname} close={handleDetail} />}
    </>
  );
};

export default FriendsList;
