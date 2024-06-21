import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePageInfo from "./ProfilePageInfo";
import privateApi from "../../api/axios_intercepter";
import FriendsList from "./follow/FriendsList";
import FriendsGames from "./follow/FriendsGames";
import EditProfileModal from "./modal/profile/EditProfileModal";

const MyPageMain = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

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

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="w-full flex justify-center py-6">
      <div className="bg-slate-50 bg-opacity-80 w-full lg:max-w-screen-xl h-auto rounded-2xl flex flex-col justify-between p-6">
        <div className="bg-white w-full h-auto rounded-2xl p-5 text-left mb-5">
          <div className="text-pink-500 text-3xl text-center border-b-4 border-gray-300">
            <b>회원정보</b>
          </div>
          <ProfilePageInfo handleOpen={handleOpen} userData={userData} />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="bg-white text-center rounded-2xl p-8 w-full lg:w-7/12 lg:mr-5 flex flex-col justify-start mb-5 lg:mb-0">
            <div className="text-pink-500 text-2xl text-left border-b-4 border-gray-300 mb-4">
              <b>친구가 참여 중인 방 목록</b>
            </div>
            <FriendsGames />
          </div>
          <div className="bg-white rounded-2xl p-5 w-full lg:w-5/12">
            <FriendsList />
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
