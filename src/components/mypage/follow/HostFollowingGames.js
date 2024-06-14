import { useEffect, useState } from "react";
import Item from "./HostFollowingGamesItem";
import privateApi from "../../../api/axios_intercepter";
import Astronaut2 from "../../animation/Astronaut2";

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
    <div className="w-full flex overflow-x-scroll scrollbar-hide" id="scrollChange">
      {list.length > 0 ? (
        <div className="flex min-w-[calc(65vw/2)] max-w-[calc(65vw/2)]">
          {list.map((gameRoomInfo, idx) => (
            <Item
              key={idx}
              roomNo={gameRoomInfo.roomNo}
              roomTitle={gameRoomInfo.title}
              host={{
                userImageUrl: gameRoomInfo.participantList[0]?.profileImage,
                userName: gameRoomInfo.master,
              }}
              headcount={gameRoomInfo.currentUser}
              maximumUser={gameRoomInfo.maximumUser}
              password={gameRoomInfo.roomPw}
              createDate={gameRoomInfo.createDate}
              category={gameRoomInfo.category}
            />
          ))}
        </div>
      ) : (
        <div className="w-full text-gray-700 flex justify-center flex-col">
          
  
            <Astronaut2 />
            <p className="text-xl font-thin text-center">참여 중인 친구가 없습니다.</p>
   
        </div>
      )}
    </div>
  );
};

export default HostFollowingGames;
