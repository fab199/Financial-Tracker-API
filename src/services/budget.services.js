const db = require("../config/dbConfig");
const { HttpException } = require("../exceptions/HttpException");

//CREATE A BUDGET
const createBudgetService = async (userId, budgetData) => {
    //Autogenerating the userId to have an Id of FTA-001 and the next FTA-002 and so on.....
    const maxbudget = await db.budget.max('budgetId');
    let newId = (maxbudget ? parseInt(maxbudget.split('-')[1], 10) + 1 : 1);
    const budgetId = `BG-${newId.toString().padStart(3, '0')}`;
    while (await db.budget.findOne({ where: { budgetId } })) {
        newId++;
        budgetId = `BG-${newId.toString().padStart(3, '0')}`;
    }
    const budgetInfo = {
        budgetId: budgetId,
        userId: userId,
        category: budgetData.category,
        budgetLimit: budgetData.budgetLimit
    }
    const newBudget = new db.budget(budgetInfo)
    const createBudget = await newBudget.save();
    return createBudget
}

//GET A BUDGET
const getBudgetService = async (budgetId) => {
    const budget = await db.budget.findOne({ where: { budgetId: budgetId }})
    if (!budget) throw new HttpException(404, "This budget does not exist")
    return budget
}

//GET ALL BUDGETS
const getAllBudgetsService = async () => {
    const budgets = await db.budget.findAll({})
    return budgets
}

//UPDATE BUDGET INFORMATION
const updateBudgetService = async (budgetId, budgetData) => {
    const budget = await db.budget.findOne({ where: { budgetId: budgetId }})
    if (!budget) throw new HttpException(404, "This budget does not exist")
    if (budgetData.budgetId) throw new HttpException(401, "You are not allowed to update budget ID")
    if (budgetData.userId) throw new HttpException(401, "You are not allowed to update user ID")
    const updatebudgetData = await db.budget.update(budgetData, { where: { budgetId: budgetId }})
    return updatebudgetData
}

//DELETE BUDGET DATA
const deleteBudgetService = async (budgetId) => {
    const budget = await db.budget.findOne({ where: { budgetId: budgetId }})
    if (!budget) throw new HttpException(404, "This budget does not exist")

    await db.budget.destroy({ where: { budgetId: budgetId }})
    return budget
}

//GET USER BUDGETS
const getUserBudgetsService = async (userId) => {
    const user = await db.user.findOne({ where: { userId: userId }})
    if (!user) throw new HttpException(404, "This User does not exist")

    const userBudgets = await db.budget.findAll({ where: { userId: userId }})
    if (!userBudgets || userBudgets.length === 0) throw new HttpException(404, "There are no budgets listed for this user")
    return userBudgets
}

//CALCULATE TOTAL EXPENSES BY CATEGORY
const totalExpensesByCategory = async (budgetId) => {
    const budget = await db.budget.findOne({ where: { budgetId: budgetId } });
    if (!budget) throw new HttpException(404, "This budget does not exist");

    // Find all transactions that belong to the specified budget's category
    const transactionsInBudget = await db.transaction.findAll({ where: { category: budget.category }})
    // Calculate the total expenses within the budget category
    const totalExpenses = transactionsInBudget.reduce((accumulator, transaction) => {
        return accumulator + transaction.amount;
    }, 0);

    return totalExpenses;
}


module.exports = { createBudgetService, getBudgetService, getAllBudgetsService, updateBudgetService, deleteBudgetService, getUserBudgetsService, totalExpensesByCategory }