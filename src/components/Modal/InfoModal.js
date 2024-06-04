import React from "react";
import useCheckedState from "../../hooks/useCheckedState";

function InfoModal({ isOpen, closeModal, title }) {
  const [isChecked, handleCheckboxChange] = useCheckedState();

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!isChecked) {
      alert("동의 체크를 해주세요.");
    } else {
      closeModal();
    }
  };

  let children;
  switch (title) {
    case "방개설방법":
      children = (
        <div className="mt-8">
          <p className="text-lg font-bold">About</p>
          <p className="mt-4">
            This is the About section of the InfoModal. You can customize the
            content here.
          </p>
        </div>
      );
      break;
    case "이용시 주의 사항":
      children = (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-[600px] h-[600px] relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              📌📌📌 필독📌📌📌
            </h2>
            <p className="mb-4">
              안녕하세요! 우리집 비어에 들어오신 것을 환영합니다!!! 공지사항
              필독해주시고, 재미 있게 놀아주시면 감사하겠습니다.♥
            </p>
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-lg font-bold mb-4 text-center">
                🚫공지 및 주의사항🚫
              </h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  음담패설과 욕설 등 타인에게 불쾌감을 주는 비매너 채팅을
                  자제해주세요. 특히, 정치 발언, 젠더 갈등 일으킬 경우
                  정지입니다.
                </li>
                <li>심한 노출은 금지 합니다.</li>
                <li>룰 모르면 마시면서 배우도록 합니다.</li>
                <li>과한 음주는 몸에 안좋습니다.</li>
                <li>연애는 오프라인으로 하세요.</li>
                <li>
                  불편사항 있으실 경우 운영진에게 신고해주시면 처리하도록
                  하겠습니다.
                </li>
                <li>경고 3회 누적시 영구 정지!</li>
              </ol>
            </div>
            <div className="flex items-center justify-center mt-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="mr-2 form-checkbox h-5 w-5 text-blue-600"
                />
                <span>동의합니다.</span>
              </label>
              <button
                onClick={handleConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      );
      break;
    case "게시판 이용 방법":
      children = (
        <div className="mt-8">
          <p className="text-lg font-bold">Privacy</p>
          <p className="mt-4">
            This is the Privacy section of the InfoModal. You can customize the
            content here.
          </p>
        </div>
      );
      break;
    default:
      children = null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-slate-300 text-black p-4 rounded-lg w-[600px] h-[600px] relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-black text-4xl hover:text-gray-500"
        >
          X
        </button>
        <h2 className="text-2xl font-bold">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default InfoModal;
