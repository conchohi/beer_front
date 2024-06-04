import FollowingList from "../Followings/FollowingList";
import HostFollowings from "../Followings/HostFollowingGames";
import { useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ProfilePageInfo from "./ProfilePageInfo";
import { useState } from "react";


const MyPageMain = () => {
  const { state } = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <div className=" w-full h-auto font-bold text-4xl text-white font-sans p-40 flex flex-col" >
      <div className="bg-gray-700 w-full h-auto rounded-2xl flex flex-col justify-between p-12">
        <div className="bg-gray-900 w-full h-auto rounded-2xl p-20 text-left mb-12">
        <div className="text-pink-500 mb-8">
              <b>마이페이지</b>
            </div>
        <ProfilePageInfo handleOpen={handleOpen} />
        </div>
        <div className="flex flex-row">
          <div className="bg-gray-900 rounded-2xl p-20 text-left w-7/12 mr-12 flex flex-col justify-start">
            <div className="text-pink-500 mb-8">
              <b>친구가 참여 중인 방 목록</b>
            </div>
            <HostFollowings />
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
    </div>
  );
};

export default MyPageMain;
