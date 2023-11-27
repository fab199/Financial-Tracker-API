module.exports = (sequelize, Sequelize) => {
    const Exchange = sequelize.define("Exchange", {
        rateId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        fromCurrency: {
            type: Sequelize.STRING,
            allowNull: false
        },
        toCurrency: {
            type: Sequelize.STRING,
            allowNull: false
        },
        initialAmount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        finalAmount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return Exchange
}