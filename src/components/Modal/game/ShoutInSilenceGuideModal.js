import { FaBell } from "react-icons/fa";

function ShoutInSilenceGuideModal({ closeModal }) {
  return (
    <>
      <div className="text-4xl text-center m-5">
        <span className="text-[#f400b0]">게임 가이드 </span>
        <br />
        고요 속의 외침
      </div>
      <button
        className="absolute top-4 right-2 border-none text-[#f400b0] bg-transparent text-2xl cursor-pointer"
        onClick={closeModal}
      >
        ✖
      </button>
      <FaBell />
      <ol className="px-10 text-2xl font-light text-start">
        <li>
          방장에게 <span className="text-[#f400b0] font-bold">키워드</span>가 주어집니다.
        </li>
        <li>
          방장은 30초 동안 제시어에 대해 <span className="text-[#f400b0] font-bold">음소거 상태</span>로 말을 합니다.
        </li>
        <li>
          방장이 말을 하는 동안, 나머지 사람들은 출제자의 입모양을 보고 제시어를 <span className="text-[#f400b0] font-bold">추리</span>합니다.
        </li>
        <li>
          정답란에 <span className="text-[#f400b0] font-bold">가장 먼저 답을 제출</span>한 사람과 <span className="text-[#f400b0] font-bold">방장</span>이 <span className="text-[#f400b0] font-bold">점수</span>를 획득합니다.
          출제자도 다른 사람들이 맞추기 쉽도록 열심히 말해 봅시다!
        </li>
        <li>
          제한 시간 동안 답을 맞춘 사람이 없으면, 아무도 점수를 얻지 못하고 다음문제로 넘어갑니다.
        </li>
      </ol>
    </>
  );
}

export default ShoutInSilenceGuideModal;
