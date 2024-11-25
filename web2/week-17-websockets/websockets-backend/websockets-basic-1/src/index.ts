import { WebSocketServer } from "ws";

const wss=new WebSocketServer({port:8080});

let allSocket=[];

wss.on('connection',(socket)=>{

    allSocket.push(socket);
    socket.on('message',(message)=>{

        
        console.log('message',message.toString());
        allSocket.forEach((sc)=>sc.send(message.toString()));
    })
})
