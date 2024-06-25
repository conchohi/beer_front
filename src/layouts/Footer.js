import React, { useEffect } from "react";
import { FaGithub, FaGithubAlt, FaGoogleDrive, FaYoutube } from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  useEffect(() => {
    document.getElementById("get-current-year").innerText =
      new Date().getFullYear();
  }, []);

  return (
    <footer className="w-full footer text-gray-400">
      <div className="w-full container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text text-lg">
              중앙정보기술인재개발원 2차 프로젝트 <span className="text-white ms-5 text-base">🍺 우리집 BEER 🍺</span>
            </h4>
            <h6 className="text-sm mt-2">
              조원 : 곽양신 김보라 박제용 유지연 이성훈 최현철
            </h6>
          </div>
          <div className="w-full lg:w-6/12 px-4 flex justify-end mt-6 lg:mt-0">
            <Link target='_blank' className="px-1" to="https://www.youtube.com/watch?v=RDssr8zE3Nw"><FaYoutube size="20" /></Link>
            <Link target='_blank' className="px-1" to="https://drive.google.com/drive/folders/1dkvxr2rZmJJpjyf_TIScOLvpA3Pk2lrV"><FaGoogleDrive size="20" /></Link>
            <Link target='_blank' className="px-1" to="https://www.notion.so/4-Beer-5d54edc1e7574cf58fc50d979819fd3bb"><RiNotionFill size="20" /></Link>
            <Link target='_blank' className="px-1" to="https://github.com/conchohi/beer_front"><FaGithub size="20" /></Link>
            <Link target='_blank' className="px-1" to="https://github.com/conchohi/beer-backend"><FaGithubAlt size="20" /></Link>

            <br />
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-500 font-semibold py-1">
              Copyright © <span id="get-current-year"></span>
              <a
                href="https://github.com/conchohi/beer_front"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white ml-1"
              >
                Team Home Beer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
