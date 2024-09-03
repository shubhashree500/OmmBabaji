const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
    // created_by: {
    //     type: DataTypes.STRING
    // },
    // updated_by: {
    //     type: DataTypes.STRING
    // },
    // created_at: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW
    // },
    // updated_at: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW
    // },
    // status: {
    //     type: DataTypes.ENUM('active', 'inactive'),
    //     defaultValue: 'active'
    // }
}, {
    tableName: 'users',
    timestamps: false 
});

module.exports = User;
