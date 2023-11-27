const jwt = require("jsonwebtoken")
const { HttpException } = require("../exceptions/HttpException")

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(
            token,
            process.env.JWT_SEC,
            (err, payLoad) => {
                if (err) throw new HttpException(403, "Your Token is Invalid")
                req.user = payLoad
                next();
            }
        )
    } else {
        res.status(401).json({
            success: false,
            status: 401,
            message: "You are not Authorized to do this, you have authenticated first!!!!!"
        })
    }
}

const verifyUser = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userId === req.params.userId) {
            next();
        } else {
            res.status(401).json({
                success: false,
                status: 401,
                message: "You are not Authorized to do this!!!!!"
            })
        }
    })
}

const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(401).json({
                success: false,
                status: "OK",
                message: "You are not an Admin so you are not Authorized to do this!!!"
            })
        }
    })
}


module.exports = { verifyToken, verifyUser, verifyAdmin }