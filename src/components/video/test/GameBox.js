import React from "react";
import BalanceGame from "./game/BalanceGame";
import CharacterGame from "./game/CharacterGame";
import LiarGame from "./game/LiarGame";
import CatchMindGame from "./game/CatchMindGame";
import ShoutInSilence from "./game/ShoutInsilence";

const GameBox = ({
  currentGame,
  nickname,
  roomNo,
  participantList,
  master,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage
}) => {
  const games = {
    "캐릭터 게임": CharacterGame,
    "라이어 게임": LiarGame,
    "캐치마인드 게임": CatchMindGame,
    "고요속의외침 게임" : ShoutInSilence,
    // "밸런스 게임": BalanceGame,
  };

  const GameComponent = games[currentGame];

  return (
    <div className="game-box flex bg-slate-100 flex-col shadow-lg p-10 h-[700px]">
      <div className="flex justify-center h-[300px]">
        {GameComponent && (
          <GameComponent 
            roomNo={roomNo} 
            nickname={nickname} 
            participantList={participantList} 
          />
        )}
      </div>
    </div>
  );
};

export default GameBox;
