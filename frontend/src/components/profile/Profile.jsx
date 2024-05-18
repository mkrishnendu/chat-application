import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { auth ,setauth} = useAuth();
  const [username, setUsername] = useState('');
  const [profile, setProfilePic] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const navigate=useNavigate();
  // const getUserDetails = async () => {
  //   try {
  //     const email = auth.user.email;
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${email}`, {
  //       method: "GET",
  //       headers: { "Authorization": `Bearer ${auth.token}` }
  //     });
  //     const data = await response.json();
  //     if (data.success) {
  //       setUsername(data.username);
  //       setEmail(data.email);
  //       setPassword(data.password);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    setEmail(auth.user.email);
    setUsername(auth.user.username);
    setProfilePic(auth.user.profile);
   
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    const formData = new FormData(); 
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if(profile){
      formData.append("profile", profile);

    } 
     console.log("pic ",profile);
     console.log("upda ",formData);
     const id=auth.user._id;
     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${id}`,{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${auth.token}`
      },
      body:formData
     });
     const data=await response.json();
    if(data.success){
      console.log(data.message);
      setauth({
        ...auth,
        user:data.user
      })
      localStorage.setItem("loginuser",JSON.stringify(auth));
      navigate("/home-chat")
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <h2>Update Profile</h2>
            {/* <div className=''>
                  <img src={``}/>
            </div> */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profilePic">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  id="profilePic"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
