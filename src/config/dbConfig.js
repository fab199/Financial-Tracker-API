const Sequelize = require("sequelize")
const dotenv = require("dotenv")
dotenv.config();

const configDetails = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
    DIALECT: "mysql",
    POOL: {
        MAX: 5,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000
    }
}

const sequelize = new Sequelize(
    configDetails.DATABASE,
    configDetails.USER,
    configDetails.PASSWORD, {
        host: configDetails.HOST,
        dialect: configDetails.DIALECT,
        pool: {
            max: configDetails.POOL.MAX,
            min: configDetails.POOL.MIN,
            acquire: configDetails.POOL.ACQUIRE,
            idle: configDetails.POOL.IDLE
        }
    }
);

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

const User = require("../models/User.js")(sequelize, Sequelize)
const State = require("../models/State.js")(sequelize, Sequelize)
const LocalGovernment = require("../models/LocalGovernment.js")(sequelize, Sequelize)
const Transaction = require("../models/Transaction.js")(sequelize, Sequelize)
const Budget = require("../models/Budget.js")(sequelize, Sequelize)
const Exchange = require("../models/Exchange.js")(sequelize, Sequelize)
const Goal = require("../models/Goal.js")(sequelize, Sequelize)
const Notification = require("../models/Notification.js")(sequelize, Sequelize)
const Report = require("../models/Report.js")(sequelize, Sequelize)

db.user = User
db.state = State
db.localGovernment = LocalGovernment
db.transaction = Transaction
db.budget = Budget
db.exchange = Exchange
db.goal = Goal
db.notification = Notification
db.report = Report


module.exports = db