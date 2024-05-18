import {useState, createContext, useContext, useEffect } from "react";

const userAuth=createContext();
const AuthProvider=({children})=>{
    const [auth,setauth]=useState({
        user:"",
        token:null
    });    
    useEffect(()=>{

        const loginuser=JSON.parse(localStorage.getItem("loginuser"));
        if(loginuser)
        {
            setauth({
                ...auth,
                user:loginuser.user,
                token:loginuser.token
            })
        }      
    },[])
    return(
        <userAuth.Provider value={{auth,setauth}}>
            {children}
        </userAuth.Provider>
    )
}
//hooks
const useAuth=()=>useContext(userAuth);
export {useAuth,AuthProvider}