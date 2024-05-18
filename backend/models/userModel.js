import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
     profile:{
        type:String,
        default:"uploads/userprofile.png"
     }
},{timestamps:true});
const userModel=new mongoose.model("user",userSchema);
export default userModel;