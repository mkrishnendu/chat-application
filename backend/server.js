import express from 'express';
// const app=express(); //these will be replaced with socket 
import { config } from 'dotenv';


import {server,app} from "./socketio/socketio.js";

import authuserRoutes from "./routes/authuserRoutes.js"
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import {connect }from "./db/connectdb.js";
config();
const PORT=4000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("./public"))
connect();//making connection to server
app.use("/api/auth",userRoutes);
app.use("/api/user",authuserRoutes);
app.use("/api/message",messageRoutes);
// app.listen(PORT,(err)=>{
//     console.log(`listening on ${PORT}`);
// })
server.listen(PORT,(err)=>{
    console.log(`server listening on ${PORT}`);
})

