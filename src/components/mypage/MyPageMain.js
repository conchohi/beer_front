
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ProfilePageInfo from "./ProfilePageInfo";
import HostFollowingGames from "./follow/HostFollowingGames";
import FollowingList from "./follow/FollowingList";
import EditProfileModal from "./modal/EditProfileModal";
import axios from "axios";

const MyPageMain = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token || !nickname) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/user/nickname/${nickname}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [nickname, navigate]);

  const handleOpen = () => setOpen(true);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="w-full h-auto font-bold text-4xl text-white font-sans p-40 flex flex-col">
      <div className="bg-gray-700 w-full h-auto rounded-2xl flex flex-col justify-between p-12">
        <div className="bg-gray-900 w-full h-auto rounded-2xl p-20 text-left mb-12">
          <div className="text-pink-500 mb-8">
            <b>마이페이지</b>
          </div>
          <ProfilePageInfo handleOpen={handleOpen} userData={userData} />
        </div>
        <div className="flex flex-row">
          <div className="bg-gray-900 rounded-2xl p-20 text-left w-7/12 mr-12 flex flex-col justify-start">
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
              <FaSearch className="text-white text-3xl hover:text-pink-500 transition duration-300 ease-in-out cursor-pointer" />
            </div>
            <FollowingList />
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        userData={userData}
      />
    </div>
  );
};

export default MyPageMain;
