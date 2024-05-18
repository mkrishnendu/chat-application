import React from 'react'
import { useConversation } from '../../context/conversationContext'
import { useSocketContext } from '../../context/socketContext';

function SingleUser({user}) {
    // console.log(user)
   const {selectedChatuser,setselectedChatuser}= useConversation();
   const isSelected=selectedChatuser?._id === user._id;
  //  console.log("selected user ",selectedChatuser);
 
 const {onlineusers}= useSocketContext();
  
// console.log("online ",onlineusers);
let isonline=onlineusers.filter(onlineuserid => onlineuserid === user._id);
  // console.log("is online ",isonline);
  return (
    <div className='single-user-container'
      
    onClick={()=>setselectedChatuser(user)}
    style={{backgroundColor:isSelected && "#38b2ac"}}
    key={user._id}
    >
        <div className='single-user-img'>
            <img src={`${process.env.REACT_APP_API_URL}/${user.profile}`} alt=''/>
        </div>
        <div className='single-user-info'>
            <span className='username'>{user.username}</span>
            {
               isonline.length>0 &&
                <span className='online-user'>online</span>
            }
        </div>
    </div>
  )
}

export default SingleUser