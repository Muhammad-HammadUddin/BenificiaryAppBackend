import express from "express"
import { verifyUserDetails,verifyDepartmentStaff,CreateDepartmentStaff} from "../controllers/Deparmtent.js";
import { verifyToken } from "../verifyToken.js";
const router=express.Router();

// User ko verify kro
router.post("/verifyUser",verifyToken,verifyUserDetails);


router.post("/Department-Staff",verifyDepartmentStaff);
router.post("/create-Department-staff",CreateDepartmentStaff)






export default router
