import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsersSlash } from "react-icons/fa";
import FollowingListItem from "./FollowingListItem.js";

export default function FollowingList() {
  const [list, setList] = useState([]);

  const getList = async () => {
    try {
      const userId = `${userId}`; // 여기에 실제 userId를 동적으로 설정하세요
      const token = `Bearer ${token}`; // 여기에 실제 JWT 토큰을 설정하세요
      const response = await axios.get(`http://localhost:8080/api/following/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setList(response.data);
    } catch (error) {
      console.error("Error fetching following list", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  if (list.length > 0) {
    return (
      <div className="max-h-40rem w-full mt-4 overflow-auto">
        {list.map((followInfo, idx) => (
          <FollowingListItem
            userNo={followInfo.userNo}
            userName={followInfo.userName}
            level={followInfo.level}
            userImage={followInfo.userImageUrl}
            online={followInfo.online}
            key={idx}
            token={`Bearer ${token}`} // 실제 JWT 토큰을 전달
            userId={`${userId}`} // 실제 userId를 전달
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
