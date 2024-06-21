import React, { useState, useEffect } from 'react';

const HoshinoEffect = () => {
  const [cursorChanged, setCursorChanged] = useState(false);

  const handleButtonClick = () => {
    setCursorChanged(!cursorChanged);
  };

  useEffect(() => {
    if (cursorChanged) {
      document.body.style.cursor = 'url(/img/main/hoshino.png), auto';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [cursorChanged]);

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={handleButtonClick}
      >
        　　　
      </button>
    </div>
  );
};

export default HoshinoEffect;
