const express=require("express");
const router=express.Router();
const verify=require("../middleware/verify")
const taskController=require("../controller/TaskController");
router.post("/tasks", verify,taskController.postTask);
router.get("/tasks", verify,taskController.getTask);
router.get("/tasks/:id",verify, taskController.fetchSingleTask);
router.put("/tasks/:id",verify, taskController.postupdateTask);
router.delete("/tasks/:id",verify, taskController.deleteTask);
module.exports=router;