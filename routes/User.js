import express from "express"

import { filterbyStatus,DeleteUser,UpdateUser,UserDetails,Registration,searchUser,UpdateStatus } from "../controllers/User.js";
import { verifyToken } from "../verifyToken.js";
const router=express.Router();


// Add a User
router.post("/form",Registration);



router.get("/:id",searchUser)
router.delete("/:id",DeleteUser)
router.put("/:id",UpdateUser)
router.put("/update/:id",UpdateStatus)

router.get("/",verifyToken,UserDetails)




export default router
