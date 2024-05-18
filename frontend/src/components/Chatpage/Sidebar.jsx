import React from 'react'
import "./Sidebar.css"
import Searchinput from './Searchinput'
import UserLists from './UserLists'
function Sidebar() {
  return (
    <div className='sidebar col-4'>
        <div className='search-container'>
        <Searchinput/>

        </div>
        <div className='userlist-container'>
            
            <UserLists/>
        </div>
    </div>
  )
}

export default Sidebar