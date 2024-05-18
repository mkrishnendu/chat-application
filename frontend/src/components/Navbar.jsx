import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"
import { useAuth } from "../context/authContext";
function Navbar() {
 const {auth,setauth}= useAuth();
const handleLogout=()=>{
  setauth(prev=>({
    ...prev,
    user:"",
    token:null,
  })
)
localStorage.removeItem("loginuser");
}

  return (
    <nav class="navbar navbar-expand-lg ">
      <div class="container-fluid">
        <Link class="navbar-brand" to="">
          Chat
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li> */}
              <li className="nav-item">
                <img src={`${process.env.REACT_APP_API_URL}/${auth.user.profile}`} style={{width:"50px",borderRadius:"50px"}}/>
              </li>
            <li class="nav-item">
              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth.user.username }
                </Link>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link class="dropdown-item" to="/home-chat/user">
                      Profile
                    </Link>
                  </li>
                </ul>
              </li>
            </li>
            <li class="nav-item">
              <button class="btn text-light logout"  onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
