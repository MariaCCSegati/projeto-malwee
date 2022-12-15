const Joi = require('joi');
const {string} = require ('joi')
const securityConsts = require('../consts/security-consts');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');

knl.post('pedidos', async(req, resp) => {
    const schema = Joi.object({
        //emissao : Joi.date().required(),
        entrega : Joi.date().required(),
        fkClient : Joi.number().min(1).required(),
        fkAddress : Joi.number().min(1).required(),
        total : Joi.string().min(1).max(100).required(),
       //clienteDesde : Joi.date().required(),
        produto: Joi.array().items(Joi.object({
            fkPedidos : Joi.number().min(1).required(),
            fkProduct : Joi.number().min(1).required(),
            valorUnitario : Joi.number().min(1).required(),
            decrescimo : Joi.number().min(1).required(),
            acrescimo : Joi.number().min(1).required(),
        }))
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.pedidos.findAll({
        where : {
            fkClient : req.body.fkClient,
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const client = knl.sequelize().models.pedidos.build({
        emissao : req.body.emissao,
        entrega : req.body.entrega,
        fkClient : req.body.fkClient,
        fkAddress : req.body.fkAddress,
        total: req.body.total,
        status   : 1
    });
    await pedidos.save();

    for (const produto of req.body.produtos){
    const resultado = knl.sequelize().models.produto-pedido.build({
        fkPedidos: produto.fkPedidos,
        fkProduct : produto.fkProduct,
        valorUnitario : produto.valorUnitario,
        decrescimo : produto.decrescimo,
        acrescimo : produto.acrescimo,
        status: 1
    })
    await resultado.save();
}
    
    resp.end();
});