const express = require("express")
const { register, login, passwordReset } = require("../controllers/auth.controller.js")
const router = express.Router()

//REGISTER A USER
router.post("/register", register)

//LOGIN AN EXISTING USER
router.post("/login", login)

//PASSWORD RESET FOR A USER
router.post("/password-reset", passwordReset)


module.exports = router