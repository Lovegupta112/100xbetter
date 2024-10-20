import { useRef, useEffect } from "react";

const usePrev = (value, initial) => {
  //   const ref = useRef();

  //   useEffect(() => {
  //     ref.current = value;
  //   }, [value]);
  //   console.log(ref.current);
  //   return ref.current;

  // correct implementation ---
  const ref = useRef({ curValue: value, prevValue: initial });

  if (ref.current.prevValue !== value) {
    ref.current.prevValue = ref.current.curValue;
    ref.current.curValue = value;
  }

  return ref.current.prevValue;
};
export default usePrev;
