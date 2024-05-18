import React, { useEffect, useState } from "react";
import { useConversation } from "../../context/conversationContext";
import { useAuth } from "../../context/authContext";

function Searchinput() {
  const [search,setsearch]=useState("");
  const [users,setusers]=useState([]);
  const {auth}=useAuth();
   const {setselectedChatuser}=useConversation();
  const getallusers=async()=>{
    try {
     // console.log(`${process.env.REACT_APP_API_URL}`);
       const response=await fetch(`${process.env.REACT_APP_API_URL}/api/get-allusers`,{
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
  const handleSearch=(e)=>{
     e.preventDefault();
     if(!search)
     {
      return;
     }
   //find user
   const finduser=users.find((user)=>user.username.toLowerCase().includes(search.toLowerCase()));
   if(finduser)
   {
      setselectedChatuser(finduser);
   }
   else{
    console.log("no user found");
    return;
   }
 
  }

  return (
    <div>
      <form class="d-flex " onSubmit={handleSearch}>
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e)=>setsearch(e.target.value)}
        />
        <button class="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <hr />
    </div>
  );
}

export default Searchinput;
