import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Chatpage/Sidebar'
import Chatcontainer from '../components/Chatpage/Chatcontainer'
import "./Homepage.css";
import { useAuth } from '../context/authContext';
import {useNavigate} from "react-router-dom"
function Homepage() {
   const {auth}=useAuth();
   console.log("home ",auth.token)
    const navigate=useNavigate();
    useEffect(()=>{
      if(!auth.token)
      {
         navigate("/");
      }
    },[auth.token]);
  return (
    <div>
     <Navbar/>
     <div className='row homepage'>
      
      <Sidebar/>       
      <Chatcontainer/>
      
     </div>
    </div>
  )
}

export default Homepage;