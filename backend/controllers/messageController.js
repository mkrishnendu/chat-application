import { conversationModel } from "../models/conversationModel.js";
import { messageModel } from "../models/messageModel.js";
import { io,getreceiverSocketId } from "../socketio/socketio.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { receiverId } = req.params;
    const senderId = req.user._id;
    console.log(senderId + " -to " + receiverId);
    // console.log("msg",message);
    //finding conversation btw sender-receiver
    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    //if no conversation found create one
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();
    await newMessage.save();
    // console.log("nsn");
    // console.log("new mess", newMessage);
    ///here socket will be added
    console.log("conversation ",conversation);
    //
   //socket io integration 
   const receiversocketid=getreceiverSocketId(receiverId);

    if(receiversocketid)
    {
       //this is used to send event to specefic client
      io.to(receiversocketid).emit("newMessage",newMessage);
    }

    return res.status(200).send({ success: true, message: newMessage });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessagesofTwo = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id;
    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })
      .populate("messages");
      console.log("conv",conversation)
    if (!conversation) {
      return res.status(200).send({success:true, conversation:[]});
    }
    return res
      .status(200)
      .send({ success: true, conversation: conversation.messages });
  } catch (error) {
    console.log("error in sending message ", error.message);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
