const db = require("../config/dbConfig");
const { HttpException } = require("../exceptions/HttpException");

//CREATE A goal
const createGoalService = async (userId, goalData) => {
    //Getting today's date in the format YYYY-MM-DD
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const day = today.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    //Autogenerating the goalId to have an Id of T-001 and the next T-002 and so on.....
    const maxGoal = await db.goal.max('goalId');
    let newId = (maxGoal ? parseInt(maxGoal.split('-')[1], 10) + 1 : 1);
    const goalId = `G-${newId.toString().padStart(3, '0')}`;
    while (await db.goal.findOne({ where: { goalId } })) {
        newId++;
        goalId = `G-${newId.toString().padStart(3, '0')}`;
    }
    const goalInfo = {
        goalId: goalId,
        userId: userId,
        goalName: goalData.goalName,
        targetAmount: goalData.targetAmount,
        isAchieved: goalData.isAchieved,
        dueDate: goalData.dueDate ? goalData.dueDate : formattedDate
    }
    const newGoal = new db.goal(goalInfo)
    const createGoal = await newGoal.save();
    return createGoal
}

//GET A GOAL
const getGoalService = async (goalId) => {
    const goal = await db.goal.findOne({ where: { goalId: goalId }})
    if (!goal) throw new HttpException(404, "This goal does not exist")
    return goal
}

//GET ALL GOALS
const getAllGoalsService = async () => {
    const goals = await db.goal.findAll({})
    return goals
}

//UPDATE GOAL INFORMATION
const updateGoalService = async (goalId, goalData) => {
    const goal = await db.goal.findOne({ where: { goalId: goalId }})
    if (!goal) throw new HttpException(404, "This goal does not exist")
    if (goalData.goalId) throw new HttpException(401, "You are not allowed to update goal ID")
    if (goalData.userId) throw new HttpException(401, "You are not allowed to update user ID")
    const updategoalData = await db.goal.update(goalData, { where: { goalId: goalId }})
    return updategoalData
}

//DELETE GOAL DATA
const deleteGoalService = async (goalId) => {
    const goal = await db.goal.findOne({ where: { goalId: goalId }})
    if (!goal) throw new HttpException(404, "This goal does not exist")

    await db.goal.destroy({ where: { goalId: goalId }})
    return goal
}

//GET USER GOALS
const getUserGoalsService = async (userId) => {
    const user = await db.user.findOne({ where: { userId: userId }})
    if (!user) throw new HttpException(404, "This User does not exist")

    const usergoals = await db.goal.findAll({ where: { userId: userId }})
    if (!usergoals || usergoals.length === 0) throw new HttpException(404, "There are no goals listed for this user")
    return usergoals
}


module.exports = { createGoalService, getGoalService, getAllGoalsService, updateGoalService, deleteGoalService, getUserGoalsService }