var winston = require('winston');

module.exports = function(file){
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({filename: file})
        ]

    });
    return logger;
}