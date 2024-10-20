import { useState } from "react";
import usePrev from "../../hooks/usePrev";

const GetPrevValue = () => {
  const [currentValue, setCurrentValue] = useState(0);

  const prevValue = usePrev(currentValue);
  console.log("prevValue", prevValue);

  return (
    <>
      <h2>Current Value: {currentValue}</h2>
      <div>GetPrevValue: {prevValue}</div>
      <button onClick={() => setCurrentValue((value) => value + 1)}>
        Increase Value
      </button>
    </>
  );
};

export default GetPrevValue;
