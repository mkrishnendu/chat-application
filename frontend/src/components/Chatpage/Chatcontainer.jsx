import React, { useEffect } from "react";
import "./Chatcontainer.css";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";
import { useConversation } from "../../context/conversationContext";
import { useAuth } from "../../context/authContext";
function Chatcontainer() {
  const { selectedChatuser, setselectedChatuser } = useConversation();
  // console.log("chat with user ", selectedChatuser);
  const { auth } = useAuth();

  return (
    <div className="col-8 chat-container">
      {!selectedChatuser ? (
        <div className="text-center text-light my-5">
          <h4>Welcome {auth.user.username}</h4>
          <h4> please Select a user to start chat</h4>
        </div>
      ) : (
        <>
          <div className="text-light py-2 mb-2 d-flex ">
            <span className="font-weight-bold mx-2">To : </span>
            <span> {selectedChatuser.username}</span>
          </div>
          <MessageBox />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default Chatcontainer;
