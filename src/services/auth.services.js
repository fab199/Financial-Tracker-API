const db = require("../config/dbConfig")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { HttpException } = require("../exceptions/HttpException")
const { statesWithLgas } = require("../config/data")
const { schema, emailValidator } = require("../middleware/validation.middleware")

//REGISTER A USER
const registerService = async (userData) => {
    const alreadyExistsUser = await db.user.findOne({ where: { email: userData.email }})
    if (alreadyExistsUser) throw new HttpException(409, "This User Already Exists")

    const state = await db.state.findOne({ where: { state: userData.state }})
    if (userData.username.length < 6) {
        throw new HttpException(403, "Username must be at least 6 characters long")
    } else if (!state) {
        throw new HttpException(401, "This state does not exist")
    } else if (state.isDisabled) {
        throw new HttpException(404, `We are not accepting users from ${userData.state} at this point in time`)
    } else if (!statesWithLgas[userData.state].includes(userData.localGovernmentArea)) {
        throw new HttpException(403, `${userData.localGovernmentArea} is not a local government area under ${userData.state}`)
    } else if (!schema.validate(userData.password)) {
        throw new HttpException(403, "Password must contain uppercase letters, lowercase letters, no whitespaces and at least 2 digits")
    } else if (!emailValidator.validate(userData.email)) {
        throw new HttpException(403, "Invalid Email, Email Address has to be in the format foo@bar.com")
    } else {
        const [localGovernmentArea, createdLocalGovernmentArea] = await db.localGovernment.findOrCreate({
            where: { localGovernmentArea: userData.localGovernmentArea},
            defaults: { state: userData.state }
        })
        //Using an hashing algorithm to has the passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt)

        //Autogenerating the userId to have an Id of FTA-001 and the next FTA-002 and so on.....
        const maxUser = await db.user.max('userId');
        let newId = (maxUser ? parseInt(maxUser.split('-')[1], 10) + 1 : 1);
        const userId = `FTA-${newId.toString().padStart(3, '0')}`;
        while (await db.user.findOne({ where: { userId } })) {
            newId++;
            userId = `FTA-${newId.toString().padStart(3, '0')}`;
        }
        //Data which are to be passed into the database
        const data = {
            userId: userId,
            username: userData.username,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            state: userData.state,
            localGovernmentArea: userData.localGovernmentArea,
            password: hashedPassword,
            profilePic: userData.profilePic,
            isAdmin: userData.isAdmin
        }
        const newUser = new db.user(data)
        const createUser = await newUser.save(); //save the data into the database
        return createUser
    }
}

const loginService = async (userData) => {
    const user = await db.user.findOne({ where: { email: userData.email }})
    if (!user) throw new HttpException(404, "User not found!!!")
    
    const isPasswordCorrect = await bcrypt.compare(userData.password, user.password)
    if (!isPasswordCorrect) throw new HttpException(403, "Email Address and Password don't match")

    const dataStoredInToken = {
        userId: user.userId,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    }
    const accessToken = jwt.sign(dataStoredInToken, process.env.JWT_SEC, { expiresIn: "30d" })
    const userInfo = {
        userId: user.userId,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: accessToken
    }
    return userInfo
}

const passwordResetService = async (userData) => {
    const user = await db.user.findOne({ where: { email: userData.email }})
    if(!user) throw new HttpException(404, "This user does not exist")
    function generateRandomAlphanumeric(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomString = "";
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters.charAt(randomIndex);
        }
      
        return randomString;
    }
    const resetPassword = generateRandomAlphanumeric(10)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(resetPassword, salt)
    await db.user.update({ password: hash }, { where: { email: userData.email }})
    return resetPassword
}

module.exports = { registerService, loginService, passwordResetService }