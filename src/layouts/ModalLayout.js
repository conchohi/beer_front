import React from 'react';
import Draggable from 'react-draggable';
import useMediaQuery from './useMediaQuery'; // Adjust the path according to your file structure

const ModalLayout = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return <>{children}</>;
  } else {
    return <Draggable>{children}</Draggable>;
  }
};

export default ModalLayout;
