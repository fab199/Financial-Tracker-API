const goalService = require("../services/goal.services.js")

//CREATE A GOAL
const createGoal = async (req, res, next) => {
    try {
        const goalData = req.body
        const userId = req.user.userId
        const createGoalData = await goalService.createGoalService(userId, goalData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "A New Goal has been Created",
            data: createGoalData
        })
    } catch (err) {
        next(err);
    }
}

//GET A GOAL
const getGoal = async (req, res, next) => {
    try {
        const goalId = req.params.GoalId
        const goal = await goalService.getGoalService(goalId)
        res.status(200).json(goal)
    } catch (err) {
        next(err);
    }
}

//GET ALL GOALS
const getAllGoals = async (req, res, next) => {
    try {
        const goals = await goalService.getAllGoalsService()
        res.status(200).json(goals)
    } catch (err) {
        next(err);
    }
}

//UPDATE GOAL
const updateGoal = async (req, res, next) => {
    try {
        const goalData = req.body
        const goalId = req.params.GoalId
        const updateGoalData = await goalService.updateGoalService(goalId, goalData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Goal Information has been updated"
        })
    } catch (err) {
        next(err);
    }
}

//DELETE GOAL
const deleteGoal = async (req, res, next) => {
    try {
        const goalId = req.params.GoalId
        await goalService.deleteGoalService(goalId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "Goal has been deleted"
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

//GET ALL GOALS MADE BY A USER
const getUserGoals = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const userGoals = await goalService.getUserGoalsService(userId)
        res.status(200).json(userGoals)
    } catch (err) {
        next(err)
    }
}


module.exports = { createGoal, getGoal, getAllGoals, updateGoal, deleteGoal, getUserGoals }