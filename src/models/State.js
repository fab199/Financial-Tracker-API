const { statesInNigeria } = require("../config/data.js")

module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("State", {
        state: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        isDisabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })

    State.associate = function(models) {
        State.hasMany(models.user, {
            foreignKey: "state",
            onDelete: "cascade"
        })
        State.hasMany(models.localGovernment, {
            foreignKey: "state",
            onDelete: " cascade"
        })
    }
    State.afterSync(async () => {
        const validStates = statesInNigeria;
        const existingStates = await State.findAll({
          attributes: ['state'],
        });
        const existingStateNames = existingStates.map(s => s.state);
    
        const newStates = validStates.filter(s => !existingStateNames.includes(s));
        const stateRecords = newStates.map(s => ({ state: s }));
    
        if (stateRecords.length) {
          await State.bulkCreate(stateRecords);
        }
      });
    return State
}