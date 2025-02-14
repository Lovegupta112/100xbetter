import { WebSocketServer, WebSocket } from "ws";
import { JWT_SECRET_KEY } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import {prismaClient} from "@repo/db/client";
interface UserWebSocketI {
  userId: string;
  websocket: WebSocket;
}

let roomManager = new Map<number, UserWebSocketI[]>();
const wss = new WebSocketServer({ port: 8080 });

const checkIsAuthenticatedUser = (token: string = "") => {
 try{
  const verified = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
  if (!verified) {
    return;
  }
  const userId = verified.userId;
  return userId;
 }
 catch(error){
 return null;
 }
};

wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) {
    return;
  }
  //   const searchParams = new URLSearchParams(url?.split("?")[1]);
  const token = request.headers["token"] as string;
  const authenticatedUserId = checkIsAuthenticatedUser(token);

  if (!authenticatedUserId) {
    ws.close();
    return;
  }

  ws.on("message", async (data) => {
    const parsedData = JSON.parse(data.toString());

    if (!parsedData) {
      ws.close();
      return;
    }
    if (parsedData.type == "join") {
      const roomId = parsedData.payload.roomId;
      const newUserWebsocket = {
        userId: authenticatedUserId,
        websocket: ws,
      };
      if (roomManager.has(roomId)) {
        const getAllRoomSockets = roomManager.get(roomId) as UserWebSocketI[];
        const isUserExist = getAllRoomSockets.find(
          (obj) => obj.userId == authenticatedUserId
        );
        if (!isUserExist) {
          roomManager.set(roomId, [...getAllRoomSockets, newUserWebsocket]);
        }
      } else {
        roomManager.set(roomId, [newUserWebsocket]);
      }
    } else if (parsedData.type == "chat") {
      const message = parsedData.payload.message;
      let roomId = parsedData.payload.roomId && Number(parsedData.payload.roomId);

      if (!roomId || !roomManager.get(roomId)) {
        ws.close();
        return;
      }
      // without roomId --
      // roomManager.forEach((value,key)=>{
      //   const userWebsockets=value;
      //   const isWebsocketExist=userWebsockets.find((obj)=>obj.websocket==ws);
      //   if(isWebsocketExist){
      //       roomid=key;
      //       return;
      //   }
      // })

      // TODO : implement queue for avoiding db call for storing each message 

      await prismaClient.chat.create({data:{
       message,
       userId:authenticatedUserId,
       roomId
      }})
      const getAllUserSockets = roomManager.get(roomId);
      getAllUserSockets?.forEach((obj) => {
        obj.websocket.send(
          JSON.stringify({type:"chat",message,roomId:roomId})
        );
      });
    } else if (parsedData.type == "leave_room") {
      let roomid = parsedData.payload.roomId;
      const getAllUserSockets = roomManager.get(roomid);
      const updatedUserSockets = getAllUserSockets?.filter(
        (obj) => obj.websocket != ws
      ) as UserWebSocketI[];
      roomManager.set(roomid, updatedUserSockets);
    }
    console.log("72.. roomManager..", roomManager);
  });

  // ws.on("close", () => {
  //   roomManager.forEach((value, key) => {
  //     const websockets = value;
  //     const isWebsocketExist = websockets.find((obj) => obj.websocket == ws);
  //     if (isWebsocketExist) {
  //       const upatedWebsockets = websockets.filter(
  //         (obj) => obj.websocket != ws
  //       );
  //       roomManager.set(key, [...upatedWebsockets]);
  //       return;
  //     }
  //   });
  //   console.log("85.. roomManager..", roomManager);
  // });
  ws.send("welcome to websocket!");
});
