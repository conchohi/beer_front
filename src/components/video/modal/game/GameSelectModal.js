import React from "react";
import { FaWindowClose } from "react-icons/fa";
import ModalLayout from "../../../../layouts/ModalLayout";

const games = [
  {
    id: "이미지 게임",
    src: "/img/imggame.png",
    alt: "Image Game",
  },
  {
    id: "고요 속의 외침",
    src: "/img/whaechim.png",
    alt: "Shout In Silence",
  },
  {
    id: "BalanceGame",
    src: "/img/balancegame.png",
    alt: "Balance Game",
  },
  {
    id: "BaskinRobbins31",
    src: "/img/liargame.png",
    alt: "Liar Game",
  },
];

const GameSelectModal = ({ close, startSelectedGame }) => {
    const handleGameSelect = (e) => {
      const selectedGame = e.target.id;
      console.log("Selected game in GameSelectModal:", selectedGame);
      startSelectedGame(selectedGame);
      close();
    };

  return (
    <ModalLayout>
      <div className="w-lvw h-lvh z-20 fixed top-0 left-0">
        <div className="absolute flex flex-col bg-[#222222] top-1/2 left-1/2 w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-xl shadow p-3">
          <div className="relative">
            <FaWindowClose className="right-3 top-3 absolute cursor-pointer" onClick={close} size="30" color="white" />
            <h1 className="text-center text-white font-bold text-4xl my-4">게임 선택</h1>
            <div className="flex justify-between items-center w-full mb-3">
              {games.map((game) => (
                <img
                  key={game.id}
                  src={game.src}
                  alt={game.alt}
                  id={game.id}
                  onClick={handleGameSelect}
                  className="cursor-pointer w-1/4 p-3 rounded-2xl object-cover transition-transform duration-500 hover:scale-110"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default GameSelectModal;
