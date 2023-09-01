module.exports.check_cookie_level= function(req,resp, cookie_name, value){
    if(! req.cookies || ! req.cookies[cookie_name] ){
        return {
          status: 401,
          error: "Salto no válido",
          message: "¡Nah nah nah!. Vuelva a la página base y comience su aprendizaje."
        }
      }
      level=parseInt(req.cookies[cookie_name]);
      if(level === NaN || level < value){
        return {
            status: 401,
            message: "Usted No debería estar aquí...Aún"
          }
      }
      if(level > value){
        return {
            status: 201,
            message: "Usted ya completó este nivel"
          }
      }
      return {
        status: 200,
        message: "Nivel aprobado"
      }
}