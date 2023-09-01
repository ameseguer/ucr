var express = require('express');
var router = express.Router();
var validator = require('../lib/validator');
var qs= require('querystring')

/* GET users listing. HEADER_X_NEXT_LEVEL */
router.get('/', function(req, res, next) {
  resp_data=validator.check_cookie_level(req,res,process.env.COOKIE_LEVEL_NAME,1)
  if(resp_data.status === 200){
    res.header( process.env.HEADER_X_NEXT_LEVEL, `/post/user`)
    res.cookie(process.env.COOKIE_LEVEL_NAME, '3')
    resp_data={
      status: 200,
      message: "¡Buen trabajo! Ahora utilice el encabezado X-siguiente para descubrir el siguiente nivel y método por usar"
    }
  }
  res.status(resp_data.status);
  res.send(resp_data);
});

router.get('/qs', function(req, res, next) {
  resp_data=validator.check_cookie_level(req,res,process.env.COOKIE_LEVEL_NAME,2)
  
  if(resp_data.status == 200){
    
    try {
      
      if(req.cookies[process.env.COOKIE_USERNAME] !== req.query[process.env.COOKIE_USERNAME]){

        resp_data={
          status: 412,
          message: `Sus credenciales para ${process.env.COOKIE_USERNAME} son incorrectas`
        }

      }
      else{
        res.header( process.env.HEADER_X_NEXT_LEVEL, "/get/qs?uid=<uid>")
        res.cookie(process.env.COOKIE_LEVEL_NAME, '3')
        resp_data={
          status: 200,
          message: "¡Buen trabajo! Ahora utilice el encabezado X-siguiente para descubrir el siguiente nivel y método por usar"
        }
      }
    }
    catch (error) {
      console.log(error)
      resp_data={
        status: 500,
        message: "Hubo un error al procesar sus datos. Revíselos en intente nuevamente"
      }
    }}
  res.status(resp_data.status)
  res.send(resp_data);
});

router.get('*',function(req,res,next){
  resp_data={
    status: 406,
    error: "Path inválido",
    message: "Procure usar el path sugerido en la página base"
  }
  res.status(resp_data.status)
  res.send(resp_data)
});

router.use('*', function (req, res, next) {
  
  resp_data={
    status: 405,
    error: "Método inválido",
    message: "Procure usar el método sugerido en el paso 1"
  }
  url=`/error?${qs.stringify(resp_data)}`
  res.send(resp_data)
})

module.exports = router;
