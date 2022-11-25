const { Sequelize } = require("sequelize");
const  groupModels = require("./group-model");

module.exports = (sequelize) => {
    sequelize.define('subgroup', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        description : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        fkGroup:{
            type:Sequelize.INTEGER.UNSIGNED,
            allowNull:false
        }
    })
}