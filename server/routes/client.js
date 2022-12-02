const Joi = require('joi');
const {string} = require ('joi')
const securityConsts = require('../consts/security-consts');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');

knl.post('client', async(req, resp) => {
    const schema = Joi.object({
        nome : Joi.string().min(1).max(100).required(),
        CNPJ : Joi.string().min(14).max(14).required(),
        razaoSocial : Joi.string().min(1).max(100).required(),
       // clienteDesde : Joi.date().required(),
        address: Joi.array().items(Joi.object({
            logradouro : Joi.string().min(3).max(100),
            bairro : Joi.string().min(2).max(30),
            cidade : Joi.string().min(3).max(60),
            uf : Joi.string().min(1).max(20),
            cep : Joi.string().min(1).max(14),
            numero: Joi.number().min(1),
            complemento: Joi.string().min(1).max(100),
            referencia: Joi.string().min(1).max(100),
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
    })
    await resultado.save();
}
    
    resp.end();
});

knl.get('client', async(req, resp) => {

    const result = await knl.sequelize().models.client.findAll({
        where : {
            status: 1
        }
    });
    console.log(result);
    resp.json(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('client/:id', async(req, resp) => {

    const result = await knl.sequelize().models.client.findAll({
        where : {
            id : req.params.id
        }
    });
    console.log(result);
    resp.json(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.put('client', async(req, resp) => {
    
    const result = await knl.sequelize().models.client.update({
        nome : req.body.nome,
        CNPJ : req.body.cnpj,
        razaoSocial : req.body.razaoSocial,
        //clienteDesde : req.body.clienteDesde,
    },{
        where : {
            id: req.body.id
        }
    });

    resp.send(result);
    console.log(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.delete('client/:id', async(req, resp) => {

    const result = await knl.sequelize().models.client.destroy({
        where : {
            id: req.params.id
        }
    });

    resp.json(result);
    console.log(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.patch('client/:id', async(req, resp) => {

    const result = await knl.sequelize().models.client.update({
        status : 0
    },{
        where : {
            id: req.params.id,
        },
    });

    resp.json(result)
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)