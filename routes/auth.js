import express from "express"
import { verifyToken } from "../verifyToken.js";
import Signin from "../controllers/auth.js";
const router=express.Router();

// Admin Login
router.post('/login',Signin);





export default router
