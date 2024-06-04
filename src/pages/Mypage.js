import { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import MyPageMain from "../components/mypage/MyPageMain";

const Mypage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <BasicLayout>


            <MyPageMain />

    </BasicLayout>
  );
};

export default Mypage;
