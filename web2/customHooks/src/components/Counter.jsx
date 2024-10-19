import useCounter from "../../hooks/useCounter";

 const Counter=()=>{

     const {count,incrementCounter,decrementCounter}=useCounter();

    
    return (
        <>
         <h3>Count Value: {count}</h3>
         <button onClick={incrementCounter}>Increment Counter</button>
         <button onClick={decrementCounter}>Decrement Counter</button>
        </>
    );
}

export default Counter;