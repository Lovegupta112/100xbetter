import {useContext, useRef} from 'react';
import { ChatContext } from '../context/ChatContext';
import { ChatContextType } from '../types/chat';

const Room = () => {

 const {socket,setIsCreatedRoom,setSocket,setEmail,setRoomName}=useContext(ChatContext) as ChatContextType;
 const roomNameRef=useRef<HTMLInputElement>(null);
 const emailNameRef=useRef<HTMLInputElement>(null);
 

 const createRoom=()=>{
  let roomName=roomNameRef?.current?.value || '';
  let emailName=emailNameRef?.current?.value || '';

   if(socket){
     socket.close();
   }
  
    const ws=new WebSocket('http://localhost:8080');
    setSocket(ws);
    setRoomName(roomName);
  
    ws.onopen=()=>{
      ws.send(JSON.stringify({
       "type": "join",
       "payload": {
         "roomId": roomName,
         "email":emailName
       }
    }))
    }
  setEmail(emailName);
  setIsCreatedRoom?.(true);
 }
  return (
    <div className=' justify-center border w-1/3 bg-indigo-500 flex flex-col gap-4 p-4'>
         <h2>For joining room , create  your room </h2>
        <div className='flex flex-col gap-4'>
        <input type="text"   placeholder='enter your room name' ref={roomNameRef}  className="rounded border-r-0 text-black p-2  focus:outline-none"/>
        <input type="text"  placeholder='enter your email' ref={emailNameRef}  className="rounded border-r-0 text-black p-2  focus:outline-none" />
        <button className='bg-indigo-900 text-white border' onClick={createRoom}>Create Room</button>
        </div>
    </div>
  )
}

export default Room;