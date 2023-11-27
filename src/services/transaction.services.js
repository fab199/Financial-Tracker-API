const db = require("../config/dbConfig");
const { HttpException } = require("../exceptions/HttpException");

//CREATE A TRANSACTION
const createTransactionService = async (userId, transactionData) => {
    //Getting today's date in the format YYYY-MM-DD
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const day = today.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    //Autogenerating the transactionId to have an Id of T-001 and the next T-002 and so on.....
    const maxTransaction = await db.transaction.max('transactionId');
    let newId = (maxTransaction ? parseInt(maxTransaction.split('-')[1], 10) + 1 : 1);
    const transactionId = `T-${newId.toString().padStart(3, '0')}`;
    while (await db.transaction.findOne({ where: { transactionId } })) {
        newId++;
        transactionId = `T-${newId.toString().padStart(3, '0')}`;
    }
    const transactionInfo = {
        transactionId: transactionId,
        userId: userId,
        category: transactionData.category,
        description: transactionData.description,
        amount: transactionData.amount,
        transactionDate: transactionData.transactionDate ? transactionData.transactionDate : formattedDate,
        transactionType: transactionData.transactionType,
    }
    const newTransaction = new db.transaction(transactionInfo)
    const createTransaction = await newTransaction.save();
    return createTransaction
}

//GET A TRANSACTION
const getTransactionService = async (transactionId) => {
    const transaction = await db.transaction.findOne({ where: { transactionId: transactionId }})
    if (!transaction) throw new HttpException(404, "This transaction does not exist")
    return transaction
}

//GET ALL TRANSACTIONS
const getAllTransactionsService = async () => {
    const transactions = await db.transaction.findAll({})
    return transactions
}

//UPDATE TRANSACTION INFORMATION
const updateTransactionService = async (transactionId, transactionData) => {
    const transaction = await db.transaction.findOne({ where: { transactionId: transactionId }})
    if (!transaction) throw new HttpException(404, "This transaction does not exist")
    if (transactionData.transactionId) throw new HttpException(401, "You are not allowed to update transaction ID")
    if (transactionData.userId) throw new HttpException(401, "You are not allowed to update user ID")
    const updateTransactionData = await db.transaction.update(transactionData, { where: { transactionId: transactionId }})
    return updateTransactionData
}

//DELETE TRANSACTION DATA
const deleteTransactionService = async (transactionId) => {
    const transaction = await db.transaction.findOne({ where: { transactionId: transactionId }})
    if (!transaction) throw new HttpException(404, "This transaction does not exist")

    await db.transaction.destroy({ where: { transactionId: transactionId }})
    return transaction
}

//GET USER TRANSACTIONS
const getUserTransactionsService = async (userId) => {
    const user = await db.user.findOne({ where: { userId: userId }})
    if (!user) throw new HttpException(404, "This User does not exist")

    const userTransactions = await db.transaction.findAll({ where: { userId: userId }})
    if (!userTransactions || userTransactions.length === 0) throw new HttpException(404, "There are no transactions listed for this user")
    return userTransactions
}


module.exports = { createTransactionService, getTransactionService, getAllTransactionsService, updateTransactionService, deleteTransactionService, getUserTransactionsService }