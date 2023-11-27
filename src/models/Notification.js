module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("Notification", {
        notificationId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        notificationType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        enabled: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    })
    Notification.associate = function(models) {
        Notification.hasMany(models.user, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
    }
    return Notification
}