const errorController = (req,res,next) =>{
    res.status(404).send("Page not found");
};


export {errorController}