const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('address', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : true,
        },
        logradouro : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        bairro : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        cidade : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        uf : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        cep : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        numero : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        complemento : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        referencia : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        fkClient:{
            type:Sequelize.INTEGER,
        }
    })
}