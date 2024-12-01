export interface ChatContextType{
    isCreatedRoom?:boolean;
    setIsCreatedRoom?:(value:boolean)=>void;
    socket:WebSocket | undefined;
    setSocket:(ws:WebSocket)=>void;
    email:string;
    setEmail:(value:string)=>void;
}