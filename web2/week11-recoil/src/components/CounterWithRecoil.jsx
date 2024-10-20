import { useState } from "react";
import count, { even } from "../store/atom/counterAtom";
import {  useRecoilValue, useSetRecoilState } from "recoil";


function Increase() {
    const setCount=useSetRecoilState(count);
    const increase = () => {
      setCount((count) => count + 2);
    };
    return (
      <>
        <button onClick={increase}>Increase</button>
      </>
    );
  }

  function Decrease() {
    const setCount=useSetRecoilState(count);
    const decrease = () => {
      setCount((count) => count -1);
    };
    return (
      <>
        <button onClick={decrease}>Decrease</button>
      </>
    );
  }
  
  function CurrentCount(){
   
    const countValue=useRecoilValue(count);
    return (
      <>
       Value: {countValue}
      </>
    );
  }

  function IsEven(){
    const isEvenCountValue=useRecoilValue(even);
    console.log('render iseven..');
    return (
    <>
     isEven:{isEvenCountValue?'Even':'Odd'}</>
)
  }
  
  function CounterWithRecoil(){
    
    return (
      <>
        <CurrentCount />
        <br />
        <Increase />
        <br />
        <Decrease />
        <br />
        <IsEven/>
      </>
    );
  }

  export default CounterWithRecoil;