import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
function Signup() {
  const [loading,setloading]=useState(false);
  const [username,setUsername]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
 

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    if(!username || !email || !password)
    {
       console.log("some fields are empty");
       return;
    }
    const user={
      username,
      email,
      password
    }
   try {
     setloading(true);
     const response=await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`,{
         method:"POST",
         headers:{ "Content-Type":"application/json"},
         body:JSON.stringify(user)

     });
     const data=await response.json();
      console.log(data);
      if(data.success)
      {
         console.log("sign up successful")
         setloading(false);
         navigate("/");
      }

   } catch (error) {
      console.log(error);
   }
   

  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">User name</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </div>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
}

export default Signup;
