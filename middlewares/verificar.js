const verificar = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }else{
      res.send('No estas autorizado')
    }
  }

  
module.exports = verificar