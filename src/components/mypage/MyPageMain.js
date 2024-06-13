import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaEnvelope } from "react-icons/fa";
import ProfilePageInfo from "./ProfilePageInfo";
import HostFollowingGames from "./follow/HostFollowingGames";
import FollowingList from "./follow/FollowingList";
import EditProfileModal from "./modal/EditProfileModal";
import privateApi from "../../api/axios_intercepter";
import SearchModal from "./modal/search/SearchModal";
import FriendRequestsModal from "./modal/friend/FriendRequestModal";

const MyPageMain = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [friendRequestsOpen, setFriendRequestsOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await privateApi.get("/api/user");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleOpen = () => setOpen(true);

  const handleFriendAccepted = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="w-full h-auto font-bold text-pink-500 p-6 px-60 py-15 pb-20 flex flex-col">
      <div className="bg-slate-200 w-full h-auto rounded-2xl flex flex-col justify-between p-6">
        <div className="bg-white w-full h-auto rounded-2xl p-5 text-left mb-12">
          <div className="text-pink-500 text-3xl text-center mb-3 p-2">
            <b>마이페이지</b>
          </div>
          <ProfilePageInfo handleOpen={handleOpen} userData={userData} />
        </div>
        <div className="flex flex-row">
          <div className="bg-gray-900 rounded-xl p-20 text-left w-7/12 mr-12 flex flex-col justify-start">
            <div className="text-pink-500 mb-8">
              <b>친구가 참여 중인 방 목록</b>
            </div>
            <HostFollowingGames />
          </div>
          <div className="bg-gray-900 rounded-2xl p-20 text-left w-5/12 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="text-pink-500">
                <b>친구 목록</b>
              </div>
              <div className="flex space-x-4">
                <button
                  className="text-white text-3xl hover:text-pink-500 transition duration-300 ease-in-out cursor-pointer"
                  onClick={() => setSearchModalOpen(true)}
                >
                  <FaSearch />
                </button>
                <button
                  className="text-white text-3xl hover:text-pink-500 transition duration-300 ease-in-out cursor-pointer"
                  onClick={() => setFriendRequestsOpen(true)}
                >
                  <FaEnvelope />
                </button>
              </div>
            </div>
            <FollowingList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        userData={userData}
      />
      {searchModalOpen && (
        <SearchModal
          show={searchModalOpen}
          closeModal={() => setSearchModalOpen(false)}
        />
      )}
      {friendRequestsOpen && (
        <FriendRequestsModal
          show={friendRequestsOpen}
          closeModal={() => setFriendRequestsOpen(false)}
          onFriendAccepted={handleFriendAccepted}
        />
      )}
    </div>
  );
};

export default MyPageMain;
