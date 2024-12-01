export interface ChatContextType{
    roomName:string;
    setRoomName:(name:string)=>void
    isCreatedRoom?:boolean;
    setIsCreatedRoom?:(value:boolean)=>void;
    socket:WebSocket | undefined;
    setSocket:(ws:WebSocket)=>void;
    email:string;
    setEmail:(value:string)=>void;
}

export interface MessageType{
    message:string;
    time:string;
    email:string;
}