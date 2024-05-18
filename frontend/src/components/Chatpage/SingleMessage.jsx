import React from 'react'
import "./Chatcontainer.css"
import { useAuth } from '../../context/authContext';


function SingleMessage({message}) {
  console.log("single ",message);
    const {auth}= useAuth(); 
    const mychat=auth.user._id ==message.senderId;
    console.log("mychat ",mychat);
    const chatclass=mychat ? "chat-right" : "chat-left";
    const timestamp=new Date(message.createdAt);
    const time=timestamp.toLocaleTimeString();
    const date=timestamp.toLocaleDateString();
  
    console.log("time",timestamp.toLocaleString());
  return (
    <div className={`message ${chatclass}`}>
          <div className='d-flex flex-column'>
           {message.message}
          
          </div>
          <div>
            {time}:
            {date}
          </div>
        
          
         
          
          
    </div>
  )
}

export default SingleMessage;