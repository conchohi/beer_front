import React from "react";
import CharacterGame from "../game/CharacterGame";
import LiarGame from "../game/LiarGame";
import CatchMindGame from "../game/CatchMindGame";
import BombGame from "../game/BombGame";
import ShoutInSilence from "../game/ShoutInsilence";
import BaskinRobbins31 from "../game/BaskinRobbins31";
import BalanceGame from "../game/BalanceGame";
import ChosungGame from "../game/ChosungGame";


const GameBox = ({
  currentGame,
  nickname,
  roomNo,
  participantList,
  master,
  setCurrentGame,
  currentTurn,
  setCurrentTurn
}) => {
  const games = {
    "캐릭터": CharacterGame,
    "라이어": LiarGame,
    "캐치마인드": CatchMindGame,
    "폭탄" : BombGame,
    "고요속의외침": ShoutInSilence,
    "베스킨라빈스": BaskinRobbins31,
    "밸런스": BalanceGame,
    "초성": ChosungGame

  };

  const GameComponent = games[currentGame];

  return (
    <div className="game-box flex bg-slate-100 flex-col shadow-lg p-5 h-[700px] w-full">
      <div className="flex justify-center h-full w-full">
        {GameComponent ? (
          <GameComponent
            roomNo={roomNo}
            nickname={nickname}
            participantList={participantList}
            master={master}
            currentGame={currentGame}
            setCurrentGame={setCurrentGame}
            currentTurn={currentTurn}
            setCurrentTurn={setCurrentTurn}
          />
        ) : (
          <div className="flex items-center justify-center text-blue-600 text-xl">
            게임을 선택해주세요
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBox;
