module.exports = (sequelize, Sequelize) => {
    const Goal = sequelize.define("Goal", {
        goalId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        goalName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        targetAmount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        isAchieved: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        dueDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    })
    Goal.associate = function(models) {
        Goal.belongsTo(models.user, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
    }

    return Goal
}