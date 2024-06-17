import React, { useState, useEffect } from "react";
import { getParticipantList, getRoom, join } from "../../../../api/roomApi";

const GameComponent = ({ roomNo, nickname }) => {
  const [participantListExceptMe, setParticipantListExceptMe] = useState([]);
  const [title, setTitle] = useState("");
  const [master, setMaster] = useState("");

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // 방에 입장
        await join(roomNo);

        // 방에 대한 정보를 가져옴
        const result = await getRoom(roomNo);

        // 참여자 정보 (자신의 닉네임 제외)
        const participants = await getParticipantList(roomNo);
        setParticipantListExceptMe(participants);

        // 방 제목 설정
        setTitle(result.title);

        // 방장 설정
        setMaster(result.master || nickname);
      } catch (error) {
        console.error("Failed to fetch room data:", error);
      }
    };

    fetchRoomData();
  }, [roomNo, nickname]);

  return (
    <div>
      <h1>{title}</h1>
      <h2>Master: {master}</h2>
      <ul>
        {participantListExceptMe.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameComponent;
