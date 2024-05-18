import bcrypt from 'bcrypt'; //this is from encryption
import jwt from "jsonwebtoken";
export const generateHashPassword =async (password)=>{
    try {
        const salt=await bcrypt.genSalt(10);
        
        const hash=await bcrypt.hash(password,salt);
        return hash;
    } catch (error) {
        console.log(error);
    }
}

export const compareHashPassword =async (password,hashedpassword)=>{
    return await bcrypt.compare(password,hashedpassword)
}
export const generateToken=(user)=>{
    const token=jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.JWT_SECRET,{ expiresIn:"1d"} );
    return token;

}