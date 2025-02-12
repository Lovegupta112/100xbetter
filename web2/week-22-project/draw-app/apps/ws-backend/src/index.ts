import { WebSocketServer ,WebSocket } from "ws";
import { JWT_SECRET_KEY } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";

let roomManager=new Map<string,WebSocket[]>();
const wss = new WebSocketServer({ port: 8080 });

const checkIsAuthenticatedUser = (token: string = "") => {
  const verified = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
  if (!verified) {
    return;
  }
  const userId = verified.userId;
  return userId;
};


wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) {
    return;
  }
//   const searchParams = new URLSearchParams(url?.split("?")[1]);
  const token = request.headers["token"] as string;
  const authenticatedUser = checkIsAuthenticatedUser(token);

  if(!authenticatedUser){
    ws.close();
     return;
  }

  console.log("authenticatedUser", authenticatedUser);

  
  ws.on("message", (data) => {

   const obj=JSON.parse(data.toString());
    
    if(!obj){
      ws.close();
      return;
    }
    if(obj.type=='join'){
        const roomId=obj.payload.roomId;
        if(roomManager.has(roomId)){
            const getAllRoomSockets=roomManager.get(roomId) as WebSocket[];
            const websocketsExecptCurrent=getAllRoomSockets.filter((websocket)=>websocket!=ws);
           roomManager.set(roomId,[...websocketsExecptCurrent,ws]);
          }
          else{
            roomManager.set(roomId,[ws]);
          }
    }
    else if (obj.type=='chat'){
         const message=obj.payload.message;
        let roomid;

          roomManager.forEach((value,key)=>{
             const websockets=value;
             const isWebsocketExist=websockets.find((websocket)=>websocket==ws);
             if(isWebsocketExist){
                roomid=key;
                return;
             }
          })
          if(roomid){
            const getAllRoomSockets = roomManager.get(roomid);
            getAllRoomSockets?.forEach((websocket)=>{
                websocket.send(message);
            })
          }
    }
     console.log('72.. roomManager..',roomManager);
  });

  ws.on('close',()=>{
    roomManager.forEach((value,key)=>{
        const websockets=value;
        const isWebsocketExist=websockets.find((websocket)=>websocket==ws);
        if(isWebsocketExist){
            const upatedWebsockets=websockets.filter((websocket)=>websocket!=ws);
            roomManager.set(key,[...upatedWebsockets]);
           return;
        }
     })
     console.log('85.. roomManager..',roomManager);
  })
  ws.send("welcome to websocket!");
});
