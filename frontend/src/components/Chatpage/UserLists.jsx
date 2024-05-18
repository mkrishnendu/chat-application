import React, { useEffect, useState } from "react";
import SingleUser from "./SingleUser";
import { useAuth } from "../../context/authContext";

function UserLists() {
  
  const [users,setusers]=useState([]);
 const {auth}= useAuth();
 const getallusers=async()=>{
   try {
    // console.log(`${process.env.REACT_APP_API_URL}`);
      const response=await fetch(`${process.env.REACT_APP_API_URL}/api/user/get-allusers`,{
        method:"GET",
        headers:{"Authorization":`Bearer ${auth.token}`}
      })

      // console.log("users",response);
     const data=await response.json();
     if(data.success)
     {
          setusers(data.users);
     }
   } catch (error) {
      console.log(error);
   }
 } 

useEffect(()=>{
  getallusers();
},[]);



  return (
    <div className="userlist">
      {users.map((user, index) => {
        return <SingleUser user={user} key={index} />;
      })}
    </div>
  );
}

export default UserLists;
