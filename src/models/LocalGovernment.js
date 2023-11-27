module.exports = (sequelize, Sequelize) => {
    const LocalGovernment = sequelize.define("local_government", {
        localGovernmentArea: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    LocalGovernment.associate = function(models) {
        LocalGovernment.hasMany(models.user, {
            foreignKey: "localGovernmentArea",
            onDelete: "cascade"
        })
        LocalGovernment.belongsTo(models.state, {
            foreignKey: "state",
            onDelete: "cascade"
        })
    }
    return LocalGovernment
}