import React, { useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  useEffect(() => {
    document.getElementById("get-current-year").innerText =
      new Date().getFullYear();
  }, []);

  return (
    <footer className="w-full footer text-white">
      <div className="w-full container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-xl text-white">
              중앙정보기술인재개발원 2차 프로젝트
            </h4>
            <br />
            <h6 className="text-lg mt-2">
              곽양신 김보라 박제용 유지연 이성훈 최현철
            </h6>
          </div>
          <div className="w-full lg:w-6/12 px-4 flex justify-end mt-6 lg:mt-0">
            <button type="button" className="text-white mx-2">
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </button>
            <button type="button" className="text-white mx-2">
              <a href="https://github.com/conchohi/beer_front">
                <i className="fab fa-github"></i>
              </a>
            </button>
            <button type="button" className="text-white mx-2">
              <a href="https://drive.google.com/drive/folders/1dkvxr2rZmJJpjyf_TIScOLvpA3Pk2lrV?usp=sharing">
                <i className="fa-brands fa-google-drive"></i>
              </a>
            </button>
            {/* <button type="button" className="text-white mx-2">
              <a href="https://github.com/conchohi/beer_front">
                <i className="fab fa-"></i>
              </a>
            </button> */}
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
