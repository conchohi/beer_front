import React from "react";

function InfoModal({ isOpen, closeModal, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-[600px] h-[900px] relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-black text-4xl"
        >
          X
        </button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default InfoModal;
