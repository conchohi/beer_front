import { useEffect, useState } from "react";
import Item from "./HostFollowingGamesItem";
import { FaUserTimes } from "react-icons/fa";
import privateApi from "../../../api/axios_intercepter";  // API 호출을 위한 import

const HostFollowingGames = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await privateApi.get("/api/friend/rooms");
        setList(response.data);
      } catch (error) {
        console.error("친구가 참여 중인 방 정보를 가져오는 중 에러 발생:", error);
      }
    };

    fetchData();

    const scrollChange = document.querySelector("#scrollChange");
    if (scrollChange) {
      const handleWheel = (event) => {
        event.preventDefault();
        if (event.deltaY > 0) {
          scrollChange.scrollBy({
            left: 420,
            behavior: "smooth",
          });
        } else {
          scrollChange.scrollBy({
            left: -420,
            behavior: "smooth",
          });
        }
      };

      scrollChange.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        scrollChange.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <div className="w-full flex" id="scrollChange">
      {list.length > 0 ? (
        <>
          {list.map((gameRoomInfo, idx) => (
            <Item
              key={idx}
              roomNo={gameRoomInfo.roomNo}
              roomTitle={gameRoomInfo.title}
              host={{ userImageUrl: gameRoomInfo.masterImage, userName: gameRoomInfo.master }}
              headcount={gameRoomInfo.currentUser}
              password={gameRoomInfo.roomPw}
              createDate={gameRoomInfo.createDate}
              category={gameRoomInfo.category}
            />
          ))}
        </>
      ) : (
        <div className="text-center mt-16">
          <FaUserTimes className="text-8xl mx-auto" />
          <div className="mt-12">
            <p className="text-3xl font-thin">지금 참여 중인 친구가 없습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostFollowingGames;
