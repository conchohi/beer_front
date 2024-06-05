import React from 'react';
import Draggable from 'react-draggable';

const BoardModalComponent = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
            <Draggable>
                <div className="relative p-8 bg-black  rounded-lg border-2 border-pink-500 w-full max-w-md m-auto flex-col flex">
                    <button onClick={onClose} className="absolute top-0 right-0 p-4 text-white">
                        &times;
                    </button>
                    {children}
                </div>
            </Draggable>
        </div>
    );
};

export default BoardModalComponent;
