import express from "express";
const router = express.Router();
import { requireSignin } from "../middleware/requireSignin.js";
import {
  authenticateduserController,
  getUserDetails,
  updateuser,
} from "../controllers/allAuthenticatedusers.js";

import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("folder multer");
    // console.log(path.resolve("./public/uploads/products"));
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const imagepath = `${Date.now()}-${file.originalname}`;
    cb(null, imagepath);
  },
});
const upload = multer({ storage: storage });
router.get("/get-allusers", requireSignin, authenticateduserController);
router.get("/:email", requireSignin, getUserDetails);
router.post("/:id", requireSignin,upload.single("profile"), updateuser);
export default router;
