import React from "react";
import { FaWindowClose } from "react-icons/fa";

const gameGuides = [
    {
        id: "캐릭터",
        src: "/img/guessquiz.png",
        alt: "Inmulquiz",
    },
    {
        id: "고요속의외침",
        src: "/img/bodylanguage.png",
        alt: "Momuromalhaeyo",
    },
    {
        id: "라이어",
        src: "/img/liargame.png",
        alt: "Liargame",
    },
    {
        id: "캐치마인드",
        src: "/img/catchmind.png",
        alt: "CatchMindGame",
    },
    {
        id: "밸런스",
        src: "/img/balancegame.png",
        alt: "BalanceGame",
    },
    {
        id: "폭탄",
        src: "/img/bomb.png",
        alt: "RandomBomb",
    },
    {
        id: "초성",
        src: "/img/hunmin.png",
        alt: "Hunminjungum",
    },
    {
        id: "베스킨라빈스",
        src: "/img/Baskin.png",
        alt: "Baskinrobbins",

    },

];

const GameSelectModal2 = ({ close, handleGameSelect }) => {
  const startGame = (e) => {
    // 게임 이름
    let game = e.target.id;
    handleGameSelect(game);
    close(); // 모달 닫기
  };

    return (
            <div className="w-lvw h-lvh z-20 fixed top-0 left-0">
                <div className="absolute flex flex-col bg-[#222222] top-1/2 left-1/2 w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-xl shadow p-3">
                    <div className="relative">
                        <FaWindowClose className="right-3 top-3 absolute cursor-pointer" onClick={close} size="30" color="white" />
                        <h1 className="text-center text-white font-bold text-4xl my-4">게임 선택</h1>
                        <div className="grid grid-cols-4 gap-4 w-full mb-3">
                            {gameGuides.map((guide) => (
                                <img
                                    key={guide.id}
                                    src={guide.src}
                                    alt={guide.alt}
                                    id={guide.id}
                                    onClick={startGame}
                                    className="cursor-pointer w-full p-3 rounded-2xl object-cover transition-transform duration-500 hover:scale-110"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    );

};

export default GameSelectModal2;
