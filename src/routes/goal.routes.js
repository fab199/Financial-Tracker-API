const express = require("express")
const { verifyToken, verifyUser, verifyAdmin } = require("../middleware/auth.middleware")
const { createGoal, getGoal, getAllGoals, updateGoal, deleteGoal, getUserGoals } = require("../controllers/goal.controller")
const router = express.Router()

//CREATE A GOAL
router.post("/", verifyToken, createGoal)

//GET A GOAL
router.get("/:userId/:transactionId", verifyUser, verifyAdmin, getGoal)

//GET ALL GOAL
router.get("/", verifyAdmin, getAllGoals)

//UPDATE A GOAL
router.put("/:userId/:transactionId", verifyUser, updateGoal)

//DELETE A GOAL
router.delete("/:userId/:transactionId", verifyToken, deleteGoal)

//GET ALL GOALS MADE BY A USER
router.get("/:userId", verifyUser, getUserGoals)


module.exports = router