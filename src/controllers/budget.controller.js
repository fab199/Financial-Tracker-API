const budgetService = require("../services/budget.services.js")

//CREATE A BUDGET
const createBudget = async (req, res, next) => {
    try {
        const BudgetData = req.body
        const userId = req.user.userId
        const createBudgetData = await budgetService.createBudgetService(userId, BudgetData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "A New Budget has been Created",
            data: createBudgetData
        })
    } catch (err) {
        next(err);
    }
}

//GET A BUDGET
const getBudget = async (req, res, next) => {
    try {
        const BudgetId = req.params.BudgetId
        const Budget = await budgetService.getBudgetService(BudgetId)
        res.status(200).json(Budget)
    } catch (err) {
        next(err);
    }
}

//GET ALL BUDGETS
const getAllBudgets = async (req, res, next) => {
    try {
        const Budgets = await budgetService.getAllBudgetsService()
        res.status(200).json(Budgets)
    } catch (err) {
        next(err);
    }
}

//UPDATE BUDGET
const updateBudget = async (req, res, next) => {
    try {
        const budgetData = req.body
        const budgetId = req.params.BudgetId
        const updateBudgetData = await budgetService.updateBudgetService(budgetId, budgetData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Budget Information has been updated"
        })
    } catch (err) {
        next(err);
    }
}

//DELETE BUDGET
const deleteBudget = async (req, res, next) => {
    try {
        const budgetId = req.params.BudgetId
        await budgetService.deleteBudgetService(budgetId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "Budget has been deleted"
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

//GET ALL BUDGETS MADE BY A USER
const getUserBudgets = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const userBudgets = await budgetService.getUserBudgetsService(userId)
        res.status(200).json(userBudgets)
    } catch (err) {
        next(err)
    }
}


module.exports = { createBudget, getBudget, getAllBudgets, updateBudget, deleteBudget, getUserBudgets }