import userModel from "../models/userModel.js";
import { compareHashPassword, generateHashPassword,generateToken } from "../Auth/auth.js";

export const registerController=async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        console.log(req.body);
        if(!username || !email || !password ){
            return res.status(400).send({
                success:false,
                message:"Please fill all the fields"
            })
        }
        //check if email is already registered
        const user=await userModel.findOne({email: email   });
        console.log(user);
        if(user)
        {
            return res.status(400).send({
                success:false,
                message:"Email is already registered"
            })
        }
         
        const hashedpassword=await generateHashPassword(password);
        const newUser=new userModel({
            username:username,
            email:email,
            password:hashedpassword
        })
       await newUser.save(); 
       return res.status(200).send({message:"Successfully registered",success:true,user:newUser});
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Internal Error"
        })
    }
}
export const loginController=async (req, res) => {
    try{
       const {email,password}=req.body;
       if(!email || !password){
        return res.status(400).send({
            success:false,
            message:"Please fill all the fields"
        })
       }
       const user=await userModel.findOne({email:email});
       console.log("login user ",user);
         if(!user)
         {
            return res.status(404).send({success:false, message:"User not found"});

         }
         const validPassword =await compareHashPassword(password, user.password);
         console.log(validPassword)
         if(!validPassword){
            return res.status(400).send({success:false, message:"Invalid password"});
         }
         //generate token 
        const token=generateToken(user);
        
        return res.status(200).send({success:true,token:token,user:user,message:"Successfully login to chatApp"}); 
         

    }catch(e){ 
        return res.status(500).send({
            success:false,
            message:"Internal Error"
        })
    }
}

