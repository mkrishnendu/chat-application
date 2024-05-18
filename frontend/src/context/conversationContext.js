import { useState, createContext, useContext, Children } from "react";

const conversationContext = createContext();

export const useConversation = () => useContext(conversationContext); //custom hook

export const ConversationProvider = ({ children }) => {
  const [selectedChatuser, setselectedChatuser] = useState(null);
  const [messages, setmessages] = useState([]);

  return (
    <conversationContext.Provider
      value={{
        selectedChatuser,
        setselectedChatuser,
        messages,
        setmessages,
      }}
    >
      {children}
    </conversationContext.Provider>
  );
};
