import React from 'react'
import "./login.css"
import { Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {auth,setauth}=useAuth();
   const [loading,setloading]=useState(false);
  const navigate=useNavigate();
    const handleSubmit = async(e) => {
         e.preventDefault();
       if(!email || !password)
       {
          console.log("some fields are empty");
          return;
       }
       const user={
        email,
        password
       }
      try {
        setloading(true);
        const response=await fetch("http://localhost:4000/api/auth/login",{
            method:"POST",
            headers:{ "Content-Type":"application/json"},
            body:JSON.stringify(user)

        });
        const data=await response.json();
         console.log(data);
         if(data.success)
         {
            localStorage.setItem("loginuser",JSON.stringify(data));
            setauth({
              ...auth,
              user:data.user,
              token:data.token
               
            })
            setloading(false);
            navigate("/home-chat");
         }

      } catch (error) {
         console.log(error);
      }
      
    };
  
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className='login-form'>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
        <div className='form-group'>
          <button type="submit" className="btn btn-primary">Login</button>
        </div>

          <Link to="/signup">Signup</Link>
        </form>
      </div>
    );
}

export default Login