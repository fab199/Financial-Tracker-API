const express = require("express")
const compression = require("compression")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const db = require("./config/dbConfig.js")
const authRoutes = require("./routes/auth.routes.js")
const userRoutes = require("./routes/user.routes.js")
const transactionRoutes = require("./routes/transaction.routes.js")
const budgetRoutes = require("./routes/budget.routes.js")
const exchangeRoutes = require("./routes/exchange.routes.js")
const goalRoutes = require("./routes/goal.routes.js")
const notificationRoutes = require("./routes/notification.routes.js")
const reportRoutes = require("./routes/report.routes.js")

db.sequelize.authenticate()
    .then(() => {
        console.log("Database Connection Successful");
    }).catch(err => {
        console.log(err);
    })
db.sequelize.sync({force: false})
    .then(() => {
        console.log("Yes Re Syncing has been done");
    }).catch(err => {
        console.log(err);
    })

const app = express()
app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(morgan("dev"))
app.use(cors())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/transactions", transactionRoutes)
app.use("/api/v1/budgets", budgetRoutes)
app.use("/api/v1/exchanges", exchangeRoutes)
app.use("/api/v1/goals", goalRoutes)
app.use("/api/v1/notifications", notificationRoutes)
app.use("/api/v1/reports", reportRoutes)
app.use((err, req, res, next) => {
    const errorStatus  = err.status || 500
    const errorMessage = err.message || "Something went wrong with the server"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Backend Server is currently running on port ${PORT}`);
})