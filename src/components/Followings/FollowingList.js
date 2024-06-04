import { useEffect, useState } from "react";
import { FaUsersSlash } from "react-icons/fa";
import Item from "./FollowingListItem";

export default function FollowingList() {
  const [list, setList] = useState([]);

  const getList = () => {
    // 임의의 데이터 설정
    const sampleData = [
      {
        userNo: 1,
        userName: "홍길동",
        userImageUrl: "",
        online: true,
      },
      {
        userNo: 2,
        userName: "김길동",
        userImageUrl: "",
        online: true,
      },
      {
        userNo: 3,
        userName: "이철수",
        userImageUrl: "",
        online: true,
      },
    ];
    setList(sampleData);
  };

  useEffect(() => {
    getList();
  }, []);

  if (list.length > 0) {
    return (
      <div className="max-h-40rem w-full mt-4 overflow-auto">
        {list.map((followInfo, idx) => (
          <Item
            userNo={followInfo.userNo}
            userName={followInfo.userName}
            level={followInfo.level}
            userImage={followInfo.userImageUrl}
            online={followInfo.online}
            key={idx}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="text-center mt-16">
        <FaUsersSlash className="text-8xl mx-auto" />
        <div className="mt-12">
          <p className="text-3xl font-thin">등록한 친구가 없습니다.</p>
        </div>
      </div>
    );
  }
}
