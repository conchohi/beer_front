import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FriendImageDisplay from "../modal/friend/FriendImageDisplay";

const HostFollowingGamesItem = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(0);

  const mockUsers = Math.floor(Math.random() * props.headcount);

  const navigateToGameRoom = () => {
    navigate(`/chat/${props.roomNo}`, {
      state: {
        roomNo: props.roomNo,
        headcount: props.headcount,
        roomTitle: props.roomTitle,
        users: users,
        password: props.password,
      },
    });
  };

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const truncateTitle = (title) => {
    return title.length > 12 ? `${title.substring(0, 12)}...` : title;
  };

  return (
    <div className="inline-block border-none m-8 text-black">
      <div className="flex items-center gap-4">
        <FriendImageDisplay 
          fileName={props.host.userImageUrl} 
          className="w-20 h-20 rounded-full border-4 border-transparent bg-gradient-to-r from-white to-white bg-clip-border"
        />
        <div className="text-center">
          <span className="text-lg">
            <span className="text-xl">{props.host.userName}</span>
          </span>
        </div>
      </div>
      <div className="mt-4">
        <img
          className="w-60 rounded-2xl cursor-pointer"
          src={`/img/chatlist/${props.category}.PNG`}
          alt="roomImage"
          onClick={navigateToGameRoom}
        />
      </div>
      <div className="text-start text-xl w-full mt-4 pl-4 cursor-pointer text-ellipsis overflow-hidden">
        <p className="line-clamp-2">방 이름 : {truncateTitle(props.roomTitle)}</p>
      </div>
      <div className="text-right text-2xl mt-2 cursor-pointer">
        <p onClick={navigateToGameRoom}>
          {props.headcount} / {props.maximumUser}
        </p>
      </div>
    </div>
  );
};

export default React.memo(HostFollowingGamesItem);
