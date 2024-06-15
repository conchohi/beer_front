import React from "react";
import CharacterGame from "./game/CharacterGame";
import LiarGame from "./game/LiarGame";
import CatchMindGame from "./game/CatchMindGame";
import ShoutInSilence from "./game/ShoutInsilence";
import BombGame from "./game/BombGame";
import BaskinRobbins31 from "../modal/game/BaskinRobbins31";
import BalanceGame from "../modal/game/BalanceGame";


const GameBox = ({
  currentGame,
  nickname,
  roomNo,
  participantList,
  master
}) => {
  const games = {
    "캐릭터 게임": CharacterGame,
    "라이어 게임": LiarGame,
    "캐치마인드 게임": CatchMindGame,
    "폭탄 게임" : BombGame,
    "고요속의외침 게임": ShoutInSilence,
    "베스킨라빈스 게임": BaskinRobbins31,
    "밸런스 게임": BalanceGame,
  };

  const GameComponent = games[currentGame];

  return (
    <div className="game-box flex bg-slate-100 flex-col shadow-lg p-5 h-[700px]">
      <div className="flex justify-center h-full">
        {GameComponent && (
          <GameComponent
            roomNo={roomNo}
            nickname={nickname}
            participantList={participantList}
            master={master}
          />
        )}
      </div>
    </div>
  );
};

export default GameBox;
