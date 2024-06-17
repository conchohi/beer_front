import React from 'react';
import ModalLayout from '../../../layouts/ModalLayout';

const BoardModalComponent = ({ children }) => {
    return (
        <div className="fixed inset-0 z-20 overflow-auto flex">
            <ModalLayout>
                <div className="relative p-8 bg-transparent  rounded-lg  w-full max-w-md m-auto flex-col flex">
                    {children}
                </div>
            </ModalLayout>
        </div>
    );
};

export default BoardModalComponent;
