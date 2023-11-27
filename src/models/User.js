module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        userId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        localGovernmentArea: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profilePic: {
            type: Sequelize.STRING,
            allowNull: true
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })
    User.associate = function(models) {
        User.hasMany(models.transaction, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
        User.hasMany(models.budget, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
        User.hasMany(models.goal, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
        User.hasMany(models.notification, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
        User.hasMany(models.report, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
        User.belongsTo(models.state, {
            foreignKey: "state",
            onDelete: "cascade"
        })
        User.belongsTo(models.localGovernment, {
            foreignKey: "localGovernmentArea",
            onDelete: "cascade"
        })
    }

    return User
}