import { useEffect, useState } from "react";
import Item from "./HostFollowingGamesItem";
import { FaUserTimes } from "react-icons/fa";

const HostFollowingGames = () => {
  const [list, setList] = useState([]);

  const mockData = [
    {
      roomNo: 1,
      roomTitle: "Game Room 1",
      host: {
        userImageUrl: "",
        userName: "홍길동",
      },
      headcount: 4,
      password: "1234",
      createDate: "2024-06-01",
      imageName: "https://via.placeholder.com/300",
    },
    {
      roomNo: 2,
      roomTitle: "Game Room 2",
      host: {
        userImageUrl: "",
        userName: "김길동",
      },
      headcount: 4,
      password: "5678",
      createDate: "2024-06-02",
      imageName: "https://via.placeholder.com/300",
    },
    {
      roomNo: 3,
      roomTitle: "Game Room 3",
      host: {
        userImageUrl: "",
        userName: "이철수",
      },
      headcount: 4,
      password: "5678",
      createDate: "2024-06-02",
      imageName: "https://via.placeholder.com/300",
    },
  ];

  useEffect(() => {
    setList(mockData);
    if (mockData.length > 0) {
      const scrollChange = document.querySelector("#scrollChange");
      scrollChange.addEventListener(
        "wheel",
        (event) => {
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
        },
        { passive: false }
      );
    }
  }, []);

  return (
    <div className="w-full flex overflow-x-auto" id="scrollChange">
      {list.length > 0 ? (
        <>
          {list.map((gameRoomInfo, idx) => (
            <Item
              key={idx}
              roomNo={gameRoomInfo.roomNo}
              roomTitle={gameRoomInfo.roomTitle}
              host={gameRoomInfo.host}
              headcount={gameRoomInfo.headcount}
              password={gameRoomInfo.password}
              createDate={gameRoomInfo.createDate}
              imageName={gameRoomInfo.imageName}
            />
          ))}
        </>
      ) : (
        <div className="text-center mt-16">
          <FaUserTimes className="text-8xl mx-auto" />
          <p className="text-3xl font-thin">지금 참여 중인 친구가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default HostFollowingGames;
