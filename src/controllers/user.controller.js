const userService = require("../services/user.services.js")

const getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const user = await userService.getUserService(userId)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUserService()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const userData = req.body
        const updateUserData = await userService.updateUserService(userId, userData)
        res.status(200).json({
            success: false,
            status: "OK",
            message: "User Information has been Successfully updated",
            data: updateUserData
        })
    } catch (err) {
        next(err)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        await userService.deleteUserService(userId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "User Information has been Successfully Deleted"
                })
            }).catch(err => {
                res.status(500).json({
                    success: false,
                    status: 500,
                    message: "Something went wrong!!!"
                })
            })
    } catch (err) {
        next(err)
    }
}

module.exports = { getUser, getAllUsers, updateUser, deleteUser }