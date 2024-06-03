import ProfilePageInfo from "../components/mypage/ProfilePageInfo";
import { useState } from "react";
import Followerslist from "../components/mypage/Followerslist";
import BasicLayout from "../layouts/BasicLayout";

const Mypage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <BasicLayout>
      <div className="bg-gray-800 min-h-screen text-white font-GmarketSans p-40 flex flex-col">
        <div className="bg-gray-700 rounded-2xl flex flex-col justify-between">
          <div className="bg-gray-800 rounded-2xl p-20 text-left m-6">
            <ProfilePageInfo handleOpen={handleOpen} />
            <hr className="my-8 border-gray-600" />
            <Followerslist />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Mypage;
