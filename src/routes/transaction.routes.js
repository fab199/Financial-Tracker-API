const express = require("express")
const { verifyToken, verifyAdmin, verifyUser } = require("../middleware/auth.middleware")
const { createTransaction, getTransaction, getAllTransactions, updateTransaction, deleteTransaction, getUserTransactions } = require("../controllers/transaction.controller")
const router = express.Router()

//CREATE A TRANSACTION
router.post("/", verifyToken, createTransaction)

//GET A TRANSACTION
router.get("/:userId/:transactionId", verifyUser, verifyAdmin, getTransaction)

//GET ALL TRANSACTIONS
router.get("/", verifyAdmin, getAllTransactions)

//UPDATE A TRANSACTION
router.put("/:userId/:transactionId", verifyUser, updateTransaction)

//DELETE A TRANSACTION
router.delete("/:userId/:transactionId", verifyToken, deleteTransaction)

//GET ALL TRANSACTIONS MADE BY A USER
router.get("/:userId", verifyUser, getUserTransactions)


module.exports = router