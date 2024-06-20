import React from "react";
import useCheckedState from "../../../hooks/useCheckedState";
import ModalLayout from "../../../layouts/ModalLayout";

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
    case "방 참여 및 개설 방법":
      children = (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-slate-200 border-4 border-yellow-400 text-gray-700 p-6 rounded-lg w-[400px] h-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              X
            </button>

            <div className=" font-bold text-center text-2xl">채팅방 참여 및 개설 방법</div>


            <div className="my-4 bg-slate-300 rounded-2xl p-3">
              <div className="space-y-2 mb-4 ">
                <div className=" ml-2 text-lg font-bold text-center bg-yellow-100 rounded-full w-[180px] px-4 py-1"> ⭐ 채팅방 참여 방법 </div>
              </div>
              <div className="space-y-2 ml-4 ">
                <div> 1. 원하는 주제를 선택한다. </div>
                <div> 2. 마음에 드는 방을 입장한다. </div>
                <div> 3. 즐겁게 즐긴다!!! 😊 </div>
              </div>
            </div>

            <div className="my-2  bg-slate-300 rounded-2xl p-3">
              <div className="space-y-3 mb-4">
                <div className=" ml-2 text-lg font-bold text-center bg-yellow-100 rounded-full w-[180px] px-4 py-1"> ⭐ 채팅방 개설 방법 </div>
              </div>
              <div className="space-y-2 ml-4">
                <div> 1. 방생성 버튼을 클릭한다. </div>
                <div> 2. 방제목을 입력하고, 원하는 관심사, 인원수, 비밀번호(선택)을 선택한다.</div>
                <div> 3. 방 생성버튼을 클릭한다. </div>
                <div> 4.  즐겁게 즐긴다!!! 🙌 </div>
              </div>
            </div>

          </div>
        </div>

      );
      break;
    case "이용시 주의 사항":
      children = (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-slate-200 border-4 border-yellow-400 p-8 rounded-lg w-[600px] h-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              📌📌📌 필독📌📌📌
            </h2>
            <p className="mb-4 ">
              안녕하세요! 우리집 비어에 들어오신 것을 환영합니다!!!
              공지사항 필독해주시고, 재미 있게 놀아주시면 감사하겠습니다.♥
            </p>
            <div className="border-4 border-gray-300 pt-4 bg-slate-300 rounded-2xl p-4">
              <h3 className="text-lg font-bold mb-4 text-center">
                🚫공지 및 주의사항🚫
              </h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li className="text-red-600"> 음주를 기반으로 하는 서비스로 미성년자는 이용할 수 없습니다.</li>
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

    default:
      children = null;
  }

  return (
    <ModalLayout>
      <div className="fixed inset-0 flex justify-center items-center z-30">
        <div className=" text-black p-4 rounded-lg relative">
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
    </ModalLayout>
  );
}

export default InfoModal;
