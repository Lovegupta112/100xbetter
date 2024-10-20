import { useState } from "react";
function Increase({ setCount }) {
    const increase = () => {
      setCount((count) => count + 1);
    };
    return (
      <>
        <button onClick={increase}>Increase</button>
      </>
    );
  }
  function Decrease({ setCount }) {
    const decrease = () => {
      setCount((count) => count -1);
    };
    return (
      <>
        <button onClick={decrease}>Decrease</button>
      </>
    );
  }
  
  function CurrentCount({count}){
  
    return (
      <>
       Value: {count}
      </>
    )
  }
  
  function Counter(){
    const [count, setCount] = useState(0);
  
    return (
      <>
        <CurrentCount count={count}/>
        <br />
        <Increase setCount={setCount} />
        <br />
        <Decrease setCount={setCount} />
      </>
    );
  }

  export default Counter;