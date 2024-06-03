import { useEffect, useRef, useState } from "react";
import Header from './Header';
import MainImage from './MainImage';
import Introduction from './Introduction';
import './Mainlayout.css'; 
import Dots from "./Dots";

const DIVIDER_HEIGHT = 5; 

function Mainlayout() {
    const outerDivRef = useRef();
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
      const wheelHandler = (e) => {
        e.preventDefault();
        const { deltaY } = e;
        const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
        const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
  
        if (deltaY > 0) {
          // 스크롤 내릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            // 현재 1페이지
            outerDivRef.current.scrollTo({
              top: pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
            setCurrentPage(2);
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            // 현재 2페이지
            outerDivRef.current.scrollTo({
              top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
              left: 0,
              behavior: "smooth",
            });
          }
        } else {
          // 스크롤 올릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            // 현재 1페이지
            outerDivRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            setCurrentPage(1);
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            // 현재 2페이지
            outerDivRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            setCurrentPage(1);
          } else {
            // 현재 3페이지
            outerDivRef.current.scrollTo({
              top: pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
            setCurrentPage(2);
          }
        }
      };
  
      const outerDivRefCurrent = outerDivRef.current;
      outerDivRefCurrent.addEventListener("wheel", wheelHandler);
      return () => {
        outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      };
    }, []);
  
    return (
      <div className="App">
        <div className="header"><Header /></div>
        <div ref={outerDivRef} className="outer bg-cover bg-center" style={{ backgroundImage: `url('/img/backgroundImage.jpg')`, minHeight: '100vh' }}>
          <Dots currentPage={currentPage} />
          <div className="inner"><MainImage /></div>
          <div className="divider"></div>
          <div className="inner"><Introduction /></div>
        </div>
      </div>
    );
  }
  
  export default Mainlayout;
  