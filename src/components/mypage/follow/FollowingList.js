import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsersSlash } from "react-icons/fa";
import FollowingListItem from "./FollowingListItem.js";

export default function FollowingList() {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  const getList = async () => {
    try {
      const userId = localStorage.getItem("saved_id");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.get(`http://localhost:8080/api/following/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setList(response.data);
    } catch (error) {
      console.error("Error fetching following list", error);
      setError(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleUnfollow = (userNo) => {
    setList((prevList) => prevList.filter((item) => item.userNo !== userNo));
  };

  if (error) {
    return (
      <div className="text-center mt-16">
        <p className="text-3xl font-thin text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (list.length > 0) {
    const userId = localStorage.getItem("userId");
    const token = `Bearer ${localStorage.getItem("token")}`;

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
            token={token} // 실제 JWT 토큰을 전달
            userId={userId} // 실제 userId를 전달
            onUnfollow={handleUnfollow} // 언팔로우 후 리스트 갱신
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
