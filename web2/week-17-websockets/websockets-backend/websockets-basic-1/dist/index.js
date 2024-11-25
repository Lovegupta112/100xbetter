"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSocket = [];
wss.on('connection', (socket) => {
    allSocket.push(socket);
    socket.on('message', (message) => {
        console.log('message', message.toString());
        allSocket.forEach((sc) => sc.send(message.toString()));
    });
});
