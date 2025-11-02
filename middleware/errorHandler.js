const {constants} = require('../constants')
const errorHandler = (err, req, res, next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({tittle:"validation error", message : err.message})
            break;
        case constants.NOT_FOUND:
            res.json({tittle:"Not found", message : err.message})
            break;
        case constants.FORBIDDEN:
            res.json({tittle:"forbidden", message : err.message})
            break;
        case constants.UNAUTHORIZED:
            res.json({tittle:"unauthorized", message : err.message})
            break;
        case constants.SERVER_ERROR:
            res.json({tittle:"server error", message : err.message})
            break;
        default:
            console.log('No error, All are good!');
            break;
    }  
}
module.exports = errorHandler