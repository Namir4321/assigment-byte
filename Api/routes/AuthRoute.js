const express=require("express");
const router=express.Router();
const authController=require("../controller/AuthController");
router.post("/register",authController.postregister);
router.post("/login", authController.postlogin);
module.exports=router;