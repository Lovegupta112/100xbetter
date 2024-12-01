import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { ChatContextType } from "../types/chat";

const Chat = () => {

  const {socket,email}=useContext(ChatContext) as ChatContextType;

  const [messages,setMessages]=useState<string[]>([]);
  const [myMessages,setMyMessages]=useState<string[]>([]);
  const messageRef=useRef<HTMLInputElement>(null);


  useEffect(()=>{

    if(!socket){
      return;
    }
    socket.onmessage=(event)=>{
      const newMessage=JSON.parse(event.data);
     if(newMessage?.email!=email){
       setMessages((prevMessage)=>[...prevMessage,newMessage.message]);
     }
     else{
      setMyMessages((prevMessage)=>[...prevMessage,newMessage.message])
     }
    }
  },[socket]);

 const handleSendMessage=()=>{
  const value=messageRef.current?.value;
  if(messageRef.current){
    messageRef.current.value='';
  }
  const payload={
    "type": "chat",
    "payload": {
      "message": value,
    }
  };
  socket?.send(JSON.stringify(payload));

 }



  return (
    <div className="border rounded-md w-3/4 h-4/5 flex flex-col">
         <h1 className="bg-indigo-600 rounded-md text-center text-2xl">Chat Messages</h1>
        <div className="flex flex-col gap-4 grow p-4 overflow-y-auto">
         {messages?.map((message,index)=>{
            return <li key={`${message}${index}`} className="list-none bg-slate-400 w-fit px-6 py-3 rounded-lg rounded-bl-none">{message}</li>
         })}
         {myMessages?.map((message,index)=>{
            return <li key={`${message}${index}`} className="list-none self-end bg-red-300 w-fit px-6 py-3 rounded-lg rounded-bl-none">{message}</li>
         })}
        </div>
        <div className="flex gap-1 p-3 items-center">
        <input type="text" className="rounded border-r-0 text-black p-4 grow focus:outline-none" ref={messageRef}/>
         <button className="w-fit p-4 bg-indigo-600 active:bg-indigo-800" onClick={handleSendMessage}>Send Message</button>
        </div>
    </div>
  )
}

export default Chat;
