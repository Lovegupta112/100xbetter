import { createContext, useState } from "react";
import { ChatContextType } from "../types/chat";

export const ChatContext=createContext<ChatContextType | null>(null);
// const ChatContext=createContext(null);


const ChatContextProvider=(props:any)=>{

    const [isCreatedRoom,setIsCreatedRoom]=useState(false);
    const [socket,setSocket]=useState<WebSocket>();
    const [email,setEmail]=useState<string>('');
    const [roomName,setRoomName]=useState<string>('');


    return <ChatContext.Provider value={{isCreatedRoom,setIsCreatedRoom,socket ,setSocket,email,setEmail,roomName,setRoomName}}>
        {props.children}
    </ChatContext.Provider>
}

export default ChatContextProvider;