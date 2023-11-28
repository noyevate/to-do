module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todo', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        completed: {
            type: DataTypes.TINYINT(1),
            defaultValue: 0,
        },
    }, {
        freezeTableName: true 
    });

    return Todo;
};