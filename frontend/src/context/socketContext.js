import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "./authContext";
import io from "socket.io-client";

const socketContext = createContext();
export const useSocketContext = () => useContext(socketContext); //hooks

export const SocketContextProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);
  const [onlineusers, setonlineusers] = useState([]);
  const { auth } = useAuth();
  console.log("all online users ",onlineusers);
  useEffect(() => {
    if (auth.token) {
        console.log(auth.user._id)
      const socket =io(`${process.env.REACT_APP_API_URL}`, {
        query: {
          userId: auth.user._id,
        }
      });
     
      setsocket(socket);
      //socket.on is used listen to the events can be used on both client and serve

      socket.on("getOnlineUsers", (users) => {
        setonlineusers(users);
      });

      //function unmount socket will be closed
      return () => socket.close();
    } else {
      //no authentication but socket is on then close it
      if (socket) {
        socket.close();
        setsocket(null);
      }
    }
  }, [auth.token]);

  return (
    <socketContext.Provider value={{ socket, onlineusers }}>
      {children}
    </socketContext.Provider>
  );
};
