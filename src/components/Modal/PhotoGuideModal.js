import { FaCamera } from "react-icons/fa";

function PhotoGuideModal({ closeModal }) {
  return (
    <>
      <div className="text-4xl text-center m-5">
        <span className="text-[#f400b0]">사진 촬영</span> 가이드{" "}
      </div>
      <button
        className="absolute top-4 right-2 border-none text-[#f400b0] bg-transparent text-2xl cursor-pointer"
        onClick={closeModal}
      >
        ✖
      </button>
      <FaCamera />
      <ol className="px-10 text-2xl font-light text-start">
        <li>
          화면 하단의 <span className="text-[#f400b0] font-bold">사진 버튼</span>을 누르면 5초 후 사진이 촬영됩니다.
        </li>
        <li>
          사진 촬영 후, 사진의 <span className="text-[#f400b0] font-bold">프레임, 제목, 본문</span>을 설정할 수 있는 창이 출력됩니다.
        </li>
        <li>
          찍은 사진은 <span className="text-[#f400b0] font-bold">'피드에 저장' 버튼</span>으로 프로필에 저장할 수 있습니다.
        </li>
        <li>취소 버튼을 누르면 찍었던 사진은 사라집니다.</li>
      </ol>
    </>
  );
}

export default PhotoGuideModal;
