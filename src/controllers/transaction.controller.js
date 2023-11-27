const transactionService = require("../services/transaction.services.js")

//CREATE A TRANSACTION
const createTransaction = async (req, res, next) => {
    try {
        const transactionData = req.body
        const userId = req.user.userId
        const createTransactionData = await transactionService.createTransactionService(userId, transactionData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "A New Transaction has been Created",
            data: createTransactionData
        })
    } catch (err) {
        next(err);
    }
}

//GET A TRANSACTION
const getTransaction = async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId
        const transaction = await transactionService.getTransactionService(transactionId)
        res.status(200).json(transaction)
    } catch (err) {
        next(err);
    }
}

//GET ALL TRANSACTIONS
const getAllTransactions = async (req, res, next) => {
    try {
        const transactions = await transactionService.getAllTransactionsService()
        res.status(200).json(transactions)
    } catch (err) {
        next(err);
    }
}

//UPDATE TRANSACTION
const updateTransaction = async (req, res, next) => {
    try {
        const transactionData = req.body
        const transactionId = req.params.transactionId
        const updateTransactionData = await transactionService.updateTransactionService(transactionId, transactionData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Transaction Information has been updated"
        })
    } catch (err) {
        next(err);
    }
}

//DELETE TRANSACTION
const deleteTransaction = async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId
        await transactionService.deleteTransactionService(transactionId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "Transaction has been deleted"
                })
            }).catch(err => {
                res.status(500).json({
                    success: false,
                    status: err.status,
                    message: err.message
                })
            })
    } catch (err) {
        next(err);
    }
}

//GET ALL TRANSACTIONS MADE BY A USER
const getUserTransactions = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const userTransactions = await transactionService.getUserTransactionsService(userId)
        res.status(200).json(userTransactions)
    } catch (err) {
        next(err)
    }
}


module.exports = { createTransaction, getTransaction, getAllTransactions, updateTransaction, deleteTransaction, getUserTransactions }