module.exports = function(sequelize, DataTypes) {
    return sequalize.define('user', {
        description: DataTypes.STRING,
        definition: DataTypes.STRING,
        result: DataTypes.STRING,
        owner_id: DataTypes.STRING,
    });
};