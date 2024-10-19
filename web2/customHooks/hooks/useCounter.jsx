import { useState } from "react";
 const useCounter=()=>{

    const [count,setCount]=useState(0);
 
    const incrementCounter=()=>{
        setCount(prevCount=>prevCount+1);
     }

     const decrementCounter=()=>{
        setCount(prevCount=>prevCount>0?prevCount-1:0);
     }
  
     return {
        count,
        incrementCounter,
        decrementCounter
     }
 
}

export default useCounter;