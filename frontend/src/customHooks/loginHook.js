import { useAuth } from "../context/authContext";


export const loginHook=()=>{
    const [loading,setloading]=useState(false);
    const {setUserauth} =useAuth();
    

}