import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePageInfo from "./ProfilePageInfo";
import HostFollowingGames from "./follow/HostFollowingGames";
import FollowingList from "./follow/FollowingList";
import EditProfileModal from "./modal/EditProfileModal";
import privateApi from "../../api/axios_intercepter";

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
    <div className="w-full h-auto font-bold text-pink-500 p-6 px-60 py-15 pb-20 flex flex-col">
      <div className="bg-slate-200 w-full h-auto rounded-2xl flex flex-col justify-between p-6">
        <div className="bg-white w-full h-auto rounded-2xl p-5 text-left mb-5">
          <div className="text-pink-500 text-3xl text-center mb-3 p-2">
            <b>회원정보</b>
          </div>
          <ProfilePageInfo handleOpen={handleOpen} userData={userData} />
        </div>
        <div className="flex flex-row">
          <div className="bg-white text-center rounded-2xl p-8 w-7/12 mr-12 flex flex-col justify-start">
            <div className="text-pink-500 text-2xl text-left mb-4 ">
              <b>친구가 참여 중인 방 목록</b>
            </div>
            <HostFollowingGames />
          </div>
          <div className="bg-white rounded-2xl p-5 text-left w-5/12">
            <FollowingList/>
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
