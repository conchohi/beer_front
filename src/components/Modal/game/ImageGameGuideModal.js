import { FaHandPaper } from "react-icons/fa";

function ImageGameGuideModal({ closeModal }) {
  return (
    <>
      <div className="text-4xl text-center m-5">
        <span className="text-[#f400b0]">게임 가이드 </span>
        <br />
        이미지 게임
      </div>
      <button
        className="absolute top-4 right-2 border-none text-[#f400b0] bg-transparent text-2xl cursor-pointer"
        onClick={closeModal}
      >
        ✖
      </button>
      <FaHandPaper />
      <ol className="px-10 text-2xl font-light text-start">
        <li>
          각 참가자는 화면에 자신의 손가락이 모두 인식되도록{" "}
          <span className="text-[#f400b0] font-bold">카메라에 손</span>을 펼쳐
          보입니다.
        </li>
        <li>
          순서대로 돌아가면서{" "}
          <span className="text-[#f400b0] font-bold">키워드</span>를 제시합니다.
        </li>
        <li>
          해당 키워드에{" "}
          <span className="text-[#f400b0] font-bold">해당하는 참가자</span>는{" "}
          <span className="text-[#f400b0] font-bold">손가락을 하나</span> 접습니다.
        </li>
        <li>손가락이 모두 접힌 사람이 나올 때 까지 반복합니다.</li>
        <li>
          손이{" "}
          <span className="text-[#f400b0] font-bold">
            모두 접힌 사람은 점수가 차감됩니다.
          </span>
          누구를 노릴지, 전략적으로 생각해 봅시다.
        </li>
      </ol>
    </>
  );
}

export default ImageGameGuideModal;
