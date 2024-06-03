import ProfilePageInfo from "../components/mypage/ProfilePageInfo";
import { useState } from "react";
import Followerslist from "../components/mypage/Followerslist";
import BasicLayout from "../layouts/BasicLayout";

const Mypage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <BasicLayout>
      <div className=" min-h-screen text-white font-GmarketSans p-40 flex flex-col">
        <div className="border px-4 py-2 rounded-2xl flex flex-col justify-between">
          <div className=" rounded-2xl p-20 text-left m-6">
          <p className="m-0 text-[2rem] sm:text-[2rem] bg-gradient-to-r from-[#8f00ff] to-[#f400b0] bg-clip-text text-transparent w-fit">
      마이 페이지
    </p>
           <hr className="my-8 border-gray-600" />
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
