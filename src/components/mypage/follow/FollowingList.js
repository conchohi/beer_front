import React, { useEffect, useState } from "react";
import { FaUsersSlash, FaSearch, FaEnvelope } from "react-icons/fa";
import privateApi from "../../../api/axios_intercepter";
import FollowingListItem from "./FollowingListItem";
import FriendRequestsModal from "../modal/friend/FriendRequestModal";
import SearchModal from "../modal/search/SearchModal";
import UserDetail from "../modal/friend/UserDetail";

const FollowingList = () => {
  const [friendRequestsOpen, setFriendRequestsOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [clickNickname, setClickNickname] = useState("");
  const [isDetail, setIsDetail] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, [refresh]);

  const handleFriendRefresh = () => {
    setRefresh(!refresh)
  }

  const fetchFriends = async () => {
    try {
      const response = await privateApi.get("/api/friend/list");
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };
  const handleDetail = () => {
    setIsDetail(!isDetail);
    setClickNickname(null);
  };

  useEffect(()=>{
    if(clickNickname){
      setIsDetail(true);
    }
  },[clickNickname])



  return (
    <>
      <div className="flex flex-col text-black h-full">
        <div className="flex items-center justify-between h-1/8 p-2 pb-0">
          <div className="text-pink-500 text-2xl ">
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
              className="text-3xl hover:text-pink-500 transition duration-300 ease-in-out cursor-pointer"
              onClick={() => setFriendRequestsOpen(true)}
            >
              <FaEnvelope />
            </button>
          </div>
        </div>
        {friends.length > 0 ? <div className="max-h-40rem w-full mt-4 overflow-auto scrollbar-hide border rounded-2xl h-full p-2 bg-gray-200">
          {friends.map(friend => (
            <FollowingListItem
              key={friend.userId}
              friend={friend}
              onFriendDeleted={handleFriendRefresh}
              setClickNickname={setClickNickname}
            />
          ))}
        </div> :
          <div className="text-center flex flex-col items-center justify-center h-full mb-10">
            <FaUsersSlash className="text-8xl mx-auto" />
            <div className="mt-12">
              <p className="text-3xl font-thin">등록한 친구가 없습니다.</p>
            </div>
          </div>}

      </div>
      {friendRequestsOpen && (
        <FriendRequestsModal
          show={friendRequestsOpen}
          closeModal={() => setFriendRequestsOpen(false)}
          onFriendAccepted={handleFriendRefresh}
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

export default FollowingList;
