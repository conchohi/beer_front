import React, { useState, useEffect } from "react";
import UserGuide from "./UserGuide";
import ModalPortal from "../Modal/Portal";
import { Transition } from "react-transition-group";
import GuideModalFrame from "../Modal/GuideModalFrame";
import GameGuide from "./GameGuide";
import Beer1 from "../animation/Beer1.js";
import Header from "../../layouts/Header.js";
import Footer from "../../layouts/Footer.js";

const Intro = () => {
  const [modalOn, setModalOn] = useState(false);
  const [nowContent, setNowContent] = useState(0);

  const openModal = (event) => {
    setNowContent(parseInt(event.target.id));
    setModalOn(true);
  };

  const closeModal = () => {
    setModalOn(false);
  };

  useEffect(() => {
    const guidepage = document.querySelector("#guidepage");
    const firstpage = document.querySelector("#firstpage");

    const handleWheel1 = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        window.scrollBy({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }
    };

    const handleWheel2 = (e) => {
      e.preventDefault();
      guidepage.scrollBy({
        left: e.deltaY > 0 ? window.innerWidth * 0.83 : -window.innerWidth * 0.83,
        behavior: "smooth",
      });
    };

    const handleWheel3 = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        window.scrollBy({
          top: -window.innerHeight,
          behavior: "smooth",
        });
      }
    };

    guidepage.addEventListener("wheel", handleWheel2, { passive: false });
    firstpage.addEventListener("wheel", handleWheel3, { passive: false });

    return () => {
      guidepage.removeEventListener("wheel", handleWheel2);
      firstpage.removeEventListener("wheel", handleWheel3);
    };
  }, []);

  return (
    <>
      <Header/>
      <div className="bg-[#1f2122] font-bold text-white font-gmarket-sans flex flex-col break-keep relative min-h-[100vh] overflow-hidden">
        <div
          className="absolute left-5 top-[75%] cursor-pointer opacity-50 text-3xl transition-opacity duration-500 hover:opacity-100"
          onClick={() => {
            const guidepage = document.querySelector("#guidepage");
            guidepage.scrollBy({
              left: -window.innerWidth * 0.83,
              behavior: "smooth",
            });
          }}
        >
          ◀
        </div>
        <div
          className="absolute right-5 top-[75%] cursor-pointer opacity-50 text-3xl transition-opacity duration-500 hover:opacity-100"
          onClick={() => {
            const guidepage = document.querySelector("#guidepage");
            guidepage.scrollBy({
              left: window.innerWidth * 0.83,
              behavior: "smooth",
            });
          }}
        >
          ▶
        </div>
        <div
          className="bg-[#353839] rounded-lg text-left mt-11 mb-11 mx-[8.3%] grid grid-cols-[83vw_83vw_83vw] items-center overflow-hidden relative"
          id="guidepage"
        >
          <div className="bg-[#222222] rounded-lg p-16 sm:p-20 my-10 mx-5 sm:mx-10 h-fit flex flex-col min-h-[50vh]" id="firstpage">
            <p className="text-[2rem] sm:text-[2.5rem] mb-4 sm:mb-8" id="serviceintro">서비스 소개</p>
            <p className="m-0 text-[4.8rem] sm:text-[6.8rem] bg-gradient-to-r from-[#8f00ff] to-[#f400b0] bg-clip-text text-transparent w-fit">
              우리집 Beer
            </p>
            <p className="m-0 text-[3rem] sm:text-[4.5rem]">화상을 통한 술모임</p>
            <div className="flex flex-row justify-between mt-4 sm:mt-8">
              <div className="flex flex-col justify-center mt-2 mb-0 font-light text-[1.8rem] sm:text-[2.5rem] w-[50%] leading-[200%]">
              우리집비어는 집에서 편안하게 술을 즐길 수 있도록 도와주는 온라인 플랫폼입니다. 
                  화상 통화 기능을 통해 같은 공간에서 술을 마시는 것 같은 
                  경험을 제공합니다.
              </div>
              <Beer1 />
            </div>
          </div>

          <div className="bg-[#222222] rounded-lg p-16 sm:p-20 my-10 mx-5 sm:mx-10 h-fit flex flex-col min-h-[50vh]">
            <p className="text-[2rem] sm:text-[2.5rem] mb-4 sm:mb-8" id="serviceintro">이용 가이드</p>
            <UserGuide openModal={openModal} />
          </div>

          <div className="bg-[#222222] rounded-lg p-16 sm:p-20 my-10 mx-5 sm:mx-10 h-fit flex flex-col min-h-[50vh]">
            <p className="text-[2rem] sm:text-[2.5rem] mb-4 sm:mb-8" id="serviceintro">게임 가이드</p>
            <GameGuide openModal={openModal} />
          </div>
        </div>
        <ModalPortal>
          <Transition unmountOnExit in={modalOn} timeout={500}>
            {(state) => (
              <GuideModalFrame
                show={state}
                closeModal={closeModal}
                nowContent={nowContent}
              />
            )}
          </Transition>
        </ModalPortal>
      </div>
      <Footer/>
    </>
  );
};

export default Intro;
