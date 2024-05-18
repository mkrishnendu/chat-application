import mongoose from 'mongoose';


export const connect=async()=>{
    try{
        const mongoURI="mongodb://127.0.0.1:27017/chatapp";
        await mongoose.connect(mongoURI);
        console.log('*************MongoDB Connected*************');
    }catch(err){
        console.log(err);
    }
}