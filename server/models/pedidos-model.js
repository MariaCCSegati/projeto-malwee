const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('pedidos', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        emissao : {
            type : Sequelize.DATE,
            allowNull : false,
        },
        entrega : {
            type : Sequelize.DATE,
            allowNull : false,
        },
        fkClient:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        fkAddress:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        total:{
            type:Sequelize.FLOAT,
            allowNull:false
        }
    })
}