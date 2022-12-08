const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('produto-pedido', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        fkPedidos:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        fkProduct:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        valorUnitario:{
            type:Sequelize.FLOAT,
            allowNull:false
        },
        decrescimo:{
            type:Sequelize.FLOAT,
            allowNull:false
        },
        acrescimo:{
            type:Sequelize.FLOAT,
            allowNull:false
        },
        total:{
            type:Sequelize.FLOAT,
            allowNull:false
        }
    })
}