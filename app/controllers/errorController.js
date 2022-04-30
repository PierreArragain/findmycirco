const errorController = {
    _404: (req, res) => {
      res.status(404).render('404',{ title : "404 - Not found"});
    },  
    
    _500: (error, req, res) => {
        console.trace(error);
        res.status(500).send(error.message);
      }
  
    };
    
    module.exports= errorController;