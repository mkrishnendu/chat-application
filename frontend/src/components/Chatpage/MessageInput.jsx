import React, { useState } from 'react'
import "./Chatcontainer.css"
import { useAuth } from '../../context/authContext';
import { useConversation } from '../../context/conversationContext';
function MessageInput() {
  const [message,setmessage]=useState("");
  const {auth}=useAuth();
 const {messages,setmessages,selectedChatuser}=useConversation();

  const handlesend=async(e)=>{
    e.preventDefault();
    console.log(message);
    const receiverId=selectedChatuser._id;
    console.log("receiver ",receiverId);
    try {
        const response=await fetch(`${process.env.REACT_APP_API_URL}/api/message/send/${receiverId}`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            "Authorization":`Bearer ${auth.token}`},
          body:JSON.stringify({message:message})
        });
        const data=await response.json();

        if(data.success)
        {
          console.log("send success");
          setmessage("");
          setmessages([...messages,data.message]);
        }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    
       <form class="d-flex message-input-form" onSubmit={handlesend}>
        <input    
          type="text" 
          placeholder="Type message"
          value={message}
          onChange={(e)=>setmessage(e.target.value)}
        />
        <button class="send-btn" type="submit">
          Send
        </button>
      </form>

  )
}

export default MessageInput