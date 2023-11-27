module.exports = (sequelize, Sequelize) => {
    const Report = sequelize.define("Report", {
        reportId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        reportType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        reportData: {
            type: Sequelize.JSON,
            allowNull: false
        },
        reportDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    })
    Report.associate=  function(models) {
        Report.belongsTo(models.user, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
    }
    return Report
}