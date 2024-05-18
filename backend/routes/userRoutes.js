import { Router } from 'express';
import { loginController, registerController } from '../controllers/authController.js';
import { requireSignin } from '../middleware/requireSignin.js';
const router=Router();

router.post('/login',loginController);
router.post("/register",registerController);

export default router;