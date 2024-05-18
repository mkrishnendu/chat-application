import express from "express";
export const app= express();
import http from "http";
import cors from "cors";
export const server=http.createServer(app);
import  {Server} from "socket.io";

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
// Create a Socket.IO server
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

export const getreceiverSocketId=(receiverId)=>{
    return usersocketMap[receiverId];

}
const usersocketMap={};// receiverid=>socket
io.on("connection",(socket)=>{
    console.log("connection ",socket.id);
   const userId=socket.handshake.query.userId;

   console.log("userId ",userId);
   
   if(userId!=undefined){
     usersocketMap[userId] = socket.id;
   }
   io.emit("getOnlineUsers",Object.keys(usersocketMap));
   
    socket.on("disconnect",()=>{
        console.log("disconnected ",socket.id);
        delete usersocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(usersocketMap));
    })
})
