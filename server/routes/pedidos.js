const Joi = require('joi');
const {string} = require ('joi')
const securityConsts = require('../consts/security-consts');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');

knl.post('pedidos', async(req, resp) => {
    const schema = Joi.object({
        emissao : Joi.date().required(),
        entrega : Joi.date().required(),
        fkClient : Joi.number().min(1).required(),
        fkAddress : Joi.number().min(1).required(),
        total : Joi.string().min(1).max(100).required(),
       // clienteDesde : Joi.date().required(),
        produto: Joi.array().items(Joi.object({
            fkPedidos : Joi.number().min(1).required(),
            pkProdutos : Joi.number().min(1).required(),
            valorUnitario : Joi.number().min(1).required(),
            decrescimo : Joi.number().min(1).required(),
            acrescimo : Joi.number().min(1).required(),
        }))
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.client.findAll({
        where : {
            nome : req.body.nome,
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const client = knl.sequelize().models.client.build({
        nome : req.body.nome,
        CNPJ : req.body.CNPJ,
        razaoSocial : req.body.razaoSocial,
        //clienteDesde : req.body.clienteDesde,
        status   : 1
    });
    await client.save();

    for (const endereco of req.body.address){
    const resultado = knl.sequelize().models.address.build({
        logradouro: endereco.logradouro,
        bairro : endereco.bairro,
        cidade : endereco.cidade,
        uf : endereco.uf,
        cep : endereco.cep,
        numero: endereco.numero,
        complemento:endereco.complemento,
        referencia: endereco.referencia,
        fkClient : client.id,
        status: 1
    })
    await resultado.save();
}
    
    resp.end();
});