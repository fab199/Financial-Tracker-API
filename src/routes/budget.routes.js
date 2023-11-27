const express = require("express")
const { verifyToken, verifyUser, verifyAdmin } = require("../middleware/auth.middleware")
const { createBudget, getBudget, getAllBudgets, updateBudget, deleteBudget, getUserBudgets } = require("../controllers/budget.controller")
const router = express.Router()

//CREATE A TRANSACTION
router.post("/", verifyToken, createBudget)

//GET A TRANSACTION
router.get("/:userId/:transactionId", verifyUser, verifyAdmin, getBudget)

//GET ALL TRANSACTIONS
router.get("/", verifyAdmin, getAllBudgets)

//UPDATE A TRANSACTION
router.put("/:userId/:transactionId", verifyUser, updateBudget)

//DELETE A TRANSACTION
router.delete("/:userId/:transactionId", verifyToken, deleteBudget)

//GET ALL TRANSACTIONS MADE BY A USER
router.get("/:userId", verifyUser, getUserBudgets)



module.exports = router