module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define("Budget", {
        budgetId: {
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
        budgetLimit: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    })

    Budget.associate = function(models) {
        Budget.belongsTo(models.user, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
    }

    return Budget
}