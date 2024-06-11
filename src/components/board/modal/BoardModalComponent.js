import React from 'react';
import Draggable from 'react-draggable';

const BoardModalComponent = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto  flex">
            <Draggable>
                <div className="relative p-8 bg-transparent  rounded-lg  w-full max-w-md m-auto flex-col flex">
                    {children}
                </div>
            </Draggable>
        </div>
    );
};

export default BoardModalComponent;
