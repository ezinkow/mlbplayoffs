module.exports = function (sequelize, DataTypes) {
    const Picksdisplays = sequelize.define("Picksdisplays", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        series_id: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        pick: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        points: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        series_date: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        lower_seed: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        higher_seed: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });

    return Picksdisplays;
};
