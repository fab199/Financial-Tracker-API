const db = require("../config/dbConfig")
const bcrypt = require("bcrypt")
const { HttpException } = require("../exceptions/HttpException")
const { schema, emailValidator } = require("../middleware/validation.middleware")

const getUserService = async (userId) => {
    const user = await db.user.findOne({ where: { userId: userId }})
    if (!user) throw new HttpException(404, "This user does not exist!!!!!")
    return user
}

const getAllUserService = async () => {
    const users = await db.user.findAll({})
    return users
}

const updateUserService = async (userId, userData) => {
    const user = await db.user.findOne({ where: { userId: userId }})
    if(!user) throw new HttpException(404, "This User does not exist")
    if (userData.userId) throw new HttpException(401, "You are not allowed to change your user ID")
    if (userData.isAdmin) throw new HttpException(401, "You are not allowed to change your Admin Status")
    
    if (userData.email) {
        if(!emailValidator.validate(userData.email)) throw new HttpException(403, "Invalid Email Address, make sure it's in the format foo@bar.com")
        const updateUser = await db.user.update(userData, { where: { userId: userId }})
        return updateUser
    } else if(userData.password) {
        if(!schema.validate(userData.password)) throw new HttpException(403, "Your Password is Invalid, it must contain uppercase letters, lowercase letters, no white spaces and at least 2 digits")
        const salt = await bcrypt.genSalt(10)
        userData.password = await bcrypt.hash(userData.password, salt)
        const updateUser = await db.user.update(userData, { where: { userId: userId }})
        return updateUser
    } else {
        const updateUser = await db.user.update(userData, { where: { userId: userId }})
        return updateUser
    }
}

const deleteUserService = async (userId) => {
    const user = await db.user.findOne({ where: { userId: userId }})
    if(!user) throw new HttpException(404, "This user does not Exist!!!")

    await db.user.destroy({ where: { userId: userId }})
    return user
}

//GET USER DATA AND IT'S CORRESPONDING TRANSACTIONS COMBINED IN ONE ENDPOINT
const getUserAndTransactions = async (userId) => {
    const user = await db.user.findOne({ where: { userId: userId }})
    if (!user) throw new HttpException(404, "This user does not exist")

    const userAndTransactions = await db.user.findOne(
        { where: { userId: userId }},
        { include: db.transaction }
    )
    return userAndTransactions
}


module.exports = { getUserService, getAllUserService, updateUserService, deleteUserService, getUserAndTransactions }