import React, { useEffect, useRef, useState } from "react";
import "./Chatcontainer.css";
import SingleMessage from "./SingleMessage";
import { useConversation } from "../../context/conversationContext";
import { useAuth } from "../../context/authContext";
import { useSocketContext } from "../../context/socketContext";
import { Spinner } from "../../pages/Spinner";
function MessageBox() {
  // const messages=[
  //     { text: "Hello, how are you?", senderId: "user1", receiverId: "user2" },
  //     { text: "I'm good, thanks!", senderId: "user2", receiverId: "user1" },
  //     { text: "What are you up to today?", senderId: "user1", receiverId: "user2" },
  //     { text: "Just chilling at home.", senderId: "user2", receiverId: "user1" },
  //     { text: "Hello, how are you?", senderId: "user1", receiverId: "user2" },
  //     { text: "I'm good, thanks!", senderId: "user2", receiverId: "user1" },
  //     { text: "What are you up to today?", senderId: "user1", receiverId: "user2" },
  //     { text: "Just chilling at home.", senderId: "user2", receiverId: "user1" },
  //     { text: "Hello, how are you?", senderId: "user1", receiverId: "user2" },
  //     { text: "I'm good, thanks!", senderId: "user2", receiverId: "user1" },
  //     { text: "What are you up to today?", senderId: "user1", receiverId: "user2" },
  //     { text: "Just chilling at home.", senderId: "user2", receiverId: "user1" },
  //     { text: "Hello, how are you?", senderId: "user1", receiverId: "user2" },
  //     { text: "I'm good, thanks!", senderId: "user2", receiverId: "user1" },
  //     { text: "What are you up to today?", senderId: "user1", receiverId: "user2" },
  //     { text: "Just chilling at home.", senderId: "user2", receiverId: "user1" }
  //   ]

  const [Loading,setLoading]=useState(false);
  const { auth } = useAuth();
  const { messages, setmessages, selectedChatuser } = useConversation();
  //socket

  const { socket } = useSocketContext();
  
//  console.log("all convers",messages);
  const getconversation = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/message/${selectedChatuser._id}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      const data = await response.json();

      console.log("get conversation for ", selectedChatuser, data.conversation);
      if (data.success) {
        // console.log("all messages ************ ",data.conversation);
        setTimeout(()=>{
  
          setLoading(false);
        },500)
        setmessages(data.conversation);
        console.log("all messages ************ ", data.conversation);
        console.log("setmessages ************ ",messages )
      }
    } catch (error) {
      console.log(error);
    }
  };
  //listen to socket
  useEffect(() => {
    socket?.on("newMessage", (newMessages) => {
      setmessages([...messages, newMessages]);
    });

    //function unmount
    return ()=>socket?.off("newMessage");
  }, [socket, setmessages,messages]);

  useEffect(() => {
    getconversation();
  }, [selectedChatuser?._id, setmessages]);

  return (
    <div className="messagebox">

      {Loading &&<Spinner/>}
      {messages.length > 0 ?(
        messages.map((message, index) => (
          <div key={index} className="messages">
            <SingleMessage message={message} />
          </div>
        ))
      ):(
        <>
      {messages.length == 0 && (
        <>
          <h3 className="text-center text-light">
            Please start a conversations
          </h3>
          <h4 className="text-center text-light">No chat is found</h4>
        </>
      )}
      </>
    )
  }
    </div>
  );
}

export default MessageBox;
