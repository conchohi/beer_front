import { FaUserCircle } from "react-icons/fa";

function PersonQuizGuideModal({ closeModal }) {
  return (
    <>
      <div className="text-4xl text-center m-5">
        <span className="text-[#f400b0]">게임 가이드 </span>
        <br />
        인물 퀴즈
      </div>
      <button
        className="absolute top-4 right-2 border-none text-[#f400b0] bg-transparent text-2xl cursor-pointer"
        onClick={closeModal}
      >
        ✖
      </button>
      <FaUserCircle />
      <ol className="px-10 text-2xl font-light text-start">
        <li>
          모든 참가자들에게 유명 <span className="text-[#f400b0] font-bold">인물의 사진</span>이 3초간 제시됩니다.
        </li>
        <li>
          참가자들은 해당 사진이 누구의 것인지 <span className="text-[#f400b0] font-bold">정답란에 이름</span>을 입력합니다.
        </li>
        <li>
          <span className="text-[#f400b0] font-bold">답을 제출</span>한 사람이 <span className="text-[#f400b0] font-bold">점수</span>를 획득합니다.
        </li>
        <li>
          제한 시간 동안 답을 맞추는 사람이 없으면, 아무도 점수를 얻지 못하고 다음 문제로 넘어갑니다.
        </li>
      </ol>
    </>
  );
}

export default PersonQuizGuideModal;
