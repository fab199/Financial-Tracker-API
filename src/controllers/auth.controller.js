const authService = require("../services/auth.services.js")

const register = async (req, res, next) => {
    try {
        const userData = req.body
        const registerData = await authService.registerService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "User has been Successfully registered",
            data: registerData
        })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const userData =  req.body
        const { userId, username, email, isAdmin, token } = await authService.loginService(userData)
        res.status(200).json({
            success: true,
            userId: userId,
            username: username,
            email: email,
            isAdmin: isAdmin,
            accessToken: token
        })
    } catch (err) {
        next(err)
    }
}

const passwordReset = async (req, res, next) => {
    try {
        const userData = req.body
        const passwordData = await authService.passwordResetService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "A New password has been successfully generated, You can log into the App",
            newPassword: passwordData
        })
    } catch (err) {
        next(err)
    }
}



module.exports = { register, login, passwordReset }