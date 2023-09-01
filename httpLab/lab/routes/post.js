var express = require('express');
var router = express.Router();
var validator = require('../lib/validator');
var qs = require('querystring')
const Ajv = require("ajv")
const ajv = new Ajv()

/* GET users listing. HEADER_X_NEXT_LEVEL */
router.post('/user', function (req, res, next) {
    resp_data = validator.check_cookie_level(req, res, process.env.COOKIE_LEVEL_NAME, 3)
    if (resp_data.status === 200) {

        const schema = {
            type: "object",
            properties: {
                [process.env.COOKIE_USERNAME]: { type: "string" }
            },
            required: [process.env.COOKIE_USERNAME],
            additionalProperties: false
        }
        const validate = ajv.compile(schema)
        const valid = validate(req.body)

        if (!valid){
            resp_data = {
                status: 400,
                message: "Algo no está bien con el body. Revise que cumple con el esquema",
                schema: schema
            }
        }
        if(req.body[process.env.COOKIE_USERNAME] !== req.cookies[process.env.COOKIE_USERNAME]){
            resp_data = {
                status: 401,
                message: "Identificador de usuario inválido",
                schema: schema
            }
        }
        else{
            // res.header(process.env.HEADER_X_NEXT_LEVEL, `/`)
            // res.cookie(process.env.COOKIE_LEVEL_NAME, '4')
            resp_data = {
                status: 201,
                message: "¡Buen trabajo! Ha concluído el laboratorio. Vuelva a la página base para comenzar de nuevo"
            }
        }
    }
    res.status(resp_data.status);
    res.send(resp_data);
});


router.post('*', function (req, res, next) {
    resp_data = {
        status: 406,
        error: "Path inválido",
        message: "Procure usar el path sugerido en la página base"
    }
    res.status(resp_data.status)
    res.send(resp_data)
});

router.use('*', function (req, res, next) {

    resp_data = {
        status: 405,
        error: "Método inválido",
        message: "Procure usar el método sugerido en el paso 2"
    }
    url = `/error?${qs.stringify(resp_data)}`
    res.send(resp_data)
})

module.exports = router;
