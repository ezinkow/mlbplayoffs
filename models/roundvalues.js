module.exports = function (sequelize, DataTypes) {
    const Roundvalues = sequelize.define("Roundvalues", {
        round: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        points: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        active_round: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    return Roundvalues;
};
