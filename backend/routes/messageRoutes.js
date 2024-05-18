import express from "express"
import { getMessagesofTwo, sendMessage } from "../controllers/messageController.js";
const router=express.Router();
import { requireSignin } from "../middleware/requireSignin.js";
router.get("/:receiverId",requireSignin,getMessagesofTwo);
router.post("/send/:receiverId",requireSignin,sendMessage);
export default router;