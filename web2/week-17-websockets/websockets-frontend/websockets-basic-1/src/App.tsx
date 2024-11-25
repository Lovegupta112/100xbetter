
import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [websocket,setWebsocket]=useState<WebSocket>();
  const inputRef=useRef();

  
  const handleMessage=()=>{
    // @ts-ignore
    const value=inputRef.current.value;
    websocket?.send(value);
  }

  useEffect(()=>{
    const ws=new WebSocket('ws://localhost:8080');
    setWebsocket(ws);

    ws.onmessage=((ev)=>{
     console.log(ev.data);
    })
  },[]);

  return (
    <>
   <input type="text"  ref={inputRef} placeholder='write your message'  />
   <button onClick={handleMessage}>Send Message</button>
    </>
  )
}

export default App
