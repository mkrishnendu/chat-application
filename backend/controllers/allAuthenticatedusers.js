import { generateHashPassword } from "../Auth/auth.js";
import userModel from "../models/userModel.js";

export const authenticateduserController=async(req,res)=>{
    try {
        const loginuserid=req.user._id;
        const allusers=await userModel.find({
            _id:{$ne:loginuserid}
        }).select("-password");

        if(allusers)
        {
            return res.status(200).send({success:true,users:allusers})
        }
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Internal Error"
        })
    }
}
export const getUserDetails=async(req,res)=>{
    try {
        console.log("getUserDetails");
         const email = req.params.email;
         console.log(email);
        const user=await userModel.findOne({email:email});
        console.log("user details ",user)
        if(user){
            return res.status(200).send({success:true,user:user});
        }
         else{
            return res.status(200).send({success:false,message:"user not found"});
         }
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Internal Error"
        })
    }
}

export const updateuser=async(req,res)=>{
    try {
        const userid=req.params.id;
        console.log("client data updated ",req.body);
        const {username,email,password} = req.body;
         const updateData={};
         if(username)
         {
            updateData.username=username;
         }
         if(password){
            const newpassword=await generateHashPassword(password);
            updateData.password=newpassword;
         }
       
        if(req.file)
        {
          let  newprofile="uploads/"+req.file.filename;
          updateData.profile=newprofile;
        }
        console.log("new updated data",updateData);
        const user=await userModel.findByIdAndUpdate(userid,updateData,{new:true});
        if(!user)
        {
                return  res.status(404).json({
                    success: false,
                    message: "User not found"
                });
        }
        return res.status(200).send({success:true, message:"profile updated successfully",user:user});
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Internal Error"
        })
    }
}