import { useState } from "react";

function useCheckedState() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return [isChecked, handleCheckboxChange];
}

export default useCheckedState;
