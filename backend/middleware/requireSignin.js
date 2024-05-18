import jwt from "jsonwebtoken";

export const requireSignin=async(req,res,next)=>{
    try {
         const authHeader=req.headers.authorization;
         if(!authHeader || !authHeader.startsWith("Bearer"))
         {
            return res.status(401).send({message:"Unauthorized access"});
         }
         const token=authHeader.split(" ")[1];
         const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
         if(!decodedToken)
         {
            return res.status(401).send({ message: "Invalid token user access" });;
         }
         req.user=decodedToken;
         next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error" });
  
    }
}