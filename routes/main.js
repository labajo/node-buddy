
/*
 * GET home page.
 */

module.exports = function(logger){

    var self = {
        animations : function(req, res){
            logger.info('Animations Portal.');
            res.render('animations', { title: 'Animations Portal.' });
        },
        addAnimation : function(req, res){
            logger.info('Add Animation Portal.');
            res.render('addAnim', { title: 'Add Animation Portal.' });
        }
    };
    return self;
}


