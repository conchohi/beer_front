import { FaFire } from "react-icons/fa";

function LotteryGuideModal({ closeModal }) {
  return (
    <>
      <div className="text-4xl text-center m-5">
        <span className="text-[#f400b0]">게임 가이드 </span>
        <br />
        역전의 한 방!
      </div>
      <button
        className="absolute top-4 right-2 border-none text-[#f400b0] bg-transparent text-2xl cursor-pointer"
        onClick={closeModal}
      >
        ✖
      </button>
      <FaFire />
      <ol className="px-10 text-2xl font-light text-start">
        <li>
          모든 참가자에게 <span className="text-[#f400b0] font-bold">8장의 카드</span>가 제시됩니다.
        </li>
        <li>
          <span className="text-[#f400b0] font-bold">각자 한 장씩</span> 카드를 선택합니다.
        </li>
        <li>카드의 효과로 점수를 얻거나 잃을 수 있습니다.</li>
      </ol>
    </>
  );
}

export default LotteryGuideModal;
