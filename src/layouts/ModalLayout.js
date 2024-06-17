import React from 'react';
import { isMobile } from 'react-device-detect';
import Draggable from 'react-draggable';

const ModalLayout = ({ children }) => {
  if (isMobile) {
    return (

          {children}    

    );
  } else {
    return (
      <Draggable>

            {children}

      </Draggable>
    );
  }
};

export default ModalLayout;
