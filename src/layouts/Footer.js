import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    document.getElementById("get-current-year").innerText = new Date().getFullYear();
  }, []);

  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4>중앙정보기술인재개발원</h4>
            <h5>
              곽양신 김보라 박제용 유지연 이성훈 최현철
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex">
              <button type="button">
                <i className="fab fa-youtube"></i>
              </button>
              <button type="button">
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span>Useful Links</span>
                <ul>
                  <li>
                    <a href="#">Notion</a>
                  </li>
                  <li>
                    <a href="https://github.com/conchohi/beer_front">Github</a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span>Other Resources</span>
                <ul>
                  <li>
                    <a href="https://www.figma.com/design/DUidwys7yXswV1VYzJqBNN/1%EC%A1%B0%EA%B8%B0%EC%97%852%EC%B0%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8---%ED%99%94%EB%A9%B4%EC%A0%95%EC%9D%98%EC%84%9C?node-id=0-1&t=F8cOjkI7ACYcr7UO-0">Figma</a>
                  </li>
                  <li>
                    <a href="https://creative-tim.com/terms?ref=njs-profile">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="https://creative-tim.com/privacy?ref=njs-profile">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="https://creative-tim.com/contact-us?ref=njs-profile">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-500 font-semibold py-1">
              Copyright © <span id="get-current-year"></span>
              <a href="https://www.creative-tim.com/product/notus-js" target="_blank" rel="noopener noreferrer"> Notus JS by</a>
              <a href="https://www.creative-tim.com?ref=njs-profile"> Creative Tim</a>.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
