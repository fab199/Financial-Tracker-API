module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("Transaction", {
        transactionId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        transactionDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        transactionType: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [["income", "expense"]]
            }
        }
    })
    Transaction.associate = function(models) {
        Transaction.belongsTo(models.user, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
    }

    return Transaction
}