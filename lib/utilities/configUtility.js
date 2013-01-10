var conf = require('nconf');

module.exports = function(filename){
    conf.use('file', {file: filename});
    return conf;
}