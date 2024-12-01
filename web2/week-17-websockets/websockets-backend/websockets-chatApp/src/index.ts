import { WebSocketServer,WebSocket } from "ws";
import {SocketRoomType} from './types/index';

const wss=new WebSocketServer({port:8080});

let socketRooms=new Map<string,SocketRoomType[]>();

wss.on('connection',(socket:WebSocket)=>{

    socket.on('message',(message)=>{

        const obj=JSON.parse(message as unknown as string);

        if(obj.type=='join'){
            let room:string=obj.payload.roomId;
            let email:string=obj.payload.email;

            let newSocketObj={
              socket:socket,
              email
            }
            // if that room exist , will add in that room array 
            if(socketRooms.has(room)){
                let websockets=socketRooms.get(room) as SocketRoomType[];
                socketRooms.set(room,[...websockets ,newSocketObj]);
            }
            else{
              socketRooms.set(room,[newSocketObj]);
            }
        }
        else if(obj.type=='chat'){
            let message=obj.payload.message;
            let time=obj.payload.time;
            socketRooms.forEach((value,key)=>{
             let roomSockets=value;
              let isAnySocketExist=roomSockets.find((sc)=>sc.socket==socket);
              if(isAnySocketExist){
                // todo : will save chat in db 
                roomSockets.forEach((sc)=>{
                  const response={
                      "message": message,
                       "email":isAnySocketExist.email,
                       "time":time
                  }
                 sc.socket.send(JSON.stringify(response));
                })
              }
            })
        }
    })

    socket.on('disconnect',()=>{
      socketRooms.forEach((value,key)=>{
        let roomSockets=value;
        let roomId=key;
        roomSockets=roomSockets.filter((sc)=>sc.socket!=socket);
        socketRooms.set(roomId,roomSockets);
      })
    })
})