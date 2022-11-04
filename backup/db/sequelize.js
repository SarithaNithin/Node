const { DataTypes } = require('sequelize');
const constants = require('../../src/constants/constants');

// define article model
const User = constants.connection.define("users", {
    uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
    },
    fullname: constants.Sequelize.STRING,
    dob: constants.Sequelize.DATE,
    isAdmin: constants.Sequelize.BOOLEAN
});

const Country = constants.connection.define("country", {
    name: {
        type: constants.Sequelize.STRING
    },
    code: {
        type: constants.Sequelize.STRING,
        primaryKey: true
    },
    dial_code: {
        type: constants.Sequelize.STRING
    }
});

const States = constants.connection.define("state", {
    uid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: constants.Sequelize.STRING
    },
    name: {
        type: constants.Sequelize.STRING
    }
});

const Cities = constants.connection.define("city", {
    uid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: constants.Sequelize.STRING
    },
    stateCode: {
        type: constants.Sequelize.STRING
    }
});
constants.connection.sync();

States.hasMany(Cities);
Cities.belongsTo(States);

Country.hasMany(Cities);
Cities.belongsTo(Country);

Country.hasMany(States);
States.belongsTo(Country);

Country.hasMany(User);
User.belongsTo(Country);

States.hasMany(User);
User.belongsTo(States);

Cities.hasMany(User);
User.belongsTo(Cities);
module.exports = {
    User,
    Country,
    States,
    Cities

};