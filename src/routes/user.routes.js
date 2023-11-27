const express = require("express")
const { verifyUser, verifyAdmin } = require("../middleware/auth.middleware")
const { getUser, getAllUsers, updateUser, deleteUser } = require("../controllers/user.controller")
const router = express.Router()

//GET A USER
router.get("/:userId", verifyUser, getUser)

//GET ALL USERS
router.get("/", verifyAdmin, getAllUsers)

//UPDATE EXISTING USER INFORMATION
router.put("/:userId", verifyUser, updateUser)

//DELETE USER INFORMATION
router.delete("/:userId", verifyUser, deleteUser)


module.exports = router