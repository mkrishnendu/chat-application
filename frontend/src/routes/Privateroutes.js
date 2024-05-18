import { useAuth } from "../context/authContext"
import {Outlet,Navigate} from "react-router-dom"
const PrivateRoutes=()=>{
     const {auth}=useAuth();
     if(auth.token)
     {
        console.log("auth ",auth);
        return <Outlet/>;
      }
      else if(!auth.token){
        return <Navigate to="/"/>;
      }  
     
};
export default PrivateRoutes;