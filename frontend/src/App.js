import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Homepage from "./pages/Homepage";
import { useAuth } from "./context/authContext";
import  PrivateRoutes from "./routes/Privateroutes";
import Profile from "./components/profile/Profile";
function App() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={auth.token ? <Navigate to="/home-chat" /> : <Login />}
      />
     
      <Route
        exact
        path="/signup"
        element={auth.token ? <Navigate to="/home-chat" /> : <Signup />}
      />
      <Route
        exact
        path="/home-chat"
        element={auth.token ? <Homepage /> : <Navigate to="/" />}
      />
      <Route
        exact
        path="/home-chat/user"
        element={auth.token ? <Profile /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
export default App;
