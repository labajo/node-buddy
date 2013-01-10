
/*
 * GET users listing.
 */


module.exports = function(logger){

    var self = {
        list : function(req, res){
            logger.info('user endpoint');
            res.send("respond with a resource");
        }
    };
    return self;
}
