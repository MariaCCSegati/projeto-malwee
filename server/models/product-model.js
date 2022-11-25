const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('product', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        description : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        preco : {
            type : Sequelize.FLOAT,
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        fkGroup:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        fkSubGroup:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        fkCollection:{
            type:Sequelize.INTEGER,
            allowNull:false
        }
    })
}