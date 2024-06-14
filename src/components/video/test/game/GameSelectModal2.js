import React from "react";
import Draggable from "react-draggable";
import { FaWindowClose } from "react-icons/fa";

const gameGuides = [
    {
        id: "캐릭터 게임",
        src: "/img/imggame.png",
        alt: "Image Game Guide",
    },
    {
        id: "고요속의외침 게임",
        src: "/img/whaechim.png",
        alt: "Shout In Silence Guide",
    },
    {
        id: "라이어 게임",
        src: "/img/liargame.png",
        alt: "Balance Game Guide",
    },
    {
        id: "캐치마인드 게임",
        src: "/img/imggame.png",
        alt: "Catch Mind Game Guide",
    },
        // {
    //     id: "밸런스 게임",
    //     src: "/img/balancegame.png",
    //     alt: "Balance Game Guide",
    // },
    {
        id: "폭탄 게임",
        src: "/img/imggame.png",
        alt: "Catch Mind Game Guide",
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
        <Draggable>
        <div className="w-lvw h-lvh z-20 fixed top-0 left-0">
            <div className="absolute flex flex-col bg-[#222222] top-1/2 left-1/2 w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-xl shadow p-3">
                <div className="relative">
                    <FaWindowClose className="right-3 top-3 absolute cursor-pointer" onClick={close} size="30" color="white" />
                    <h1 className="text-center text-white font-bold text-4xl my-4">게임 선택</h1>
                    <div className="flex justify-between items-center w-full mb-3">
                        {gameGuides.map((guide) => (
                            <img
                                key={guide.id}
                                src={guide.src}
                                alt={guide.alt}
                                id={guide.id}
                                onClick={startGame}
                                className="cursor-pointer w-1/4 p-3 rounded-2xl object-cover transition-transform duration-500 hover:scale-110"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </Draggable>
    );
};

export default GameSelectModal2;
