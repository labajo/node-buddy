var parseForms = require('../lib/utilities/parseDynamicForms');

module.exports = function (ibuddymanager, mongoDBCore, logger) {
    //"use strict";
    var self = {
        headColor : function (req, res) {
            var color = req.params.color;
            var sequence = {headColor: color, heart: 'false', wings: 'false', left: 'false', right: 'false'};
            logger.info('Changing head color to ' +  color);

            ibuddymanager.sendCommand(sequence, function (status) {
                if (status) {
                    res.send(200, "Sent Command to device.");
                } else {
                    res.send(200, "Sent Command to device has failed.");
                }
            });
        },
        animation : function (req, res) {
            var anim = [
                {headColor: 'red', heart: 'true', wings: 'true', left: 'false', right: 'false', timeout: 700},
                {headColor: 'white', heart: 'false', wings: 'false', left: 'false', right: 'false', timeout: 700},
                {headColor: 'white', heart: 'true', wings: 'true', left: 'false', right: 'false', timeout: 700},
                {headColor: 'green', heart: 'false', wings: 'false', left: 'false', right: 'false', timeout: 700},
                {headColor: 'yellow', heart: 'true', wings: 'true', left: 'false', right: 'false', timeout: 700},
                {headColor: 'none', heart: 'false', wings: 'false', left: 'false', right: 'false', timeout: 700}
            ];
            ibuddymanager.sendAnimation(anim, function (status) {
                if (status) {
                    res.send(200, "Sent Command to device.");
                } else {
                    res.send(200, "Sent Command to device has failed.");
                }
            });
        },
        addAnimation : function(req, res, next){
            var requestBody = req.body;
            logger.info(JSON.stringify(requestBody));
            parseForms.parseAnimationForm(requestBody, function(err, animation){
                logger.info(JSON.stringify(animation));
                mongoDBCore.insertAnimation(animation, function(err, result){

                });
                if(animation.sequences){
                    ibuddymanager.sendAnimation(animation.sequences, function(status){
                        if(status){
                            res.send(200, "Sent Animation to device.");
                        }else{
                            res.send(200, "Sent Animation to device has failed.");
                        }
                    });
                }
            });
        },
        playAnimation : function(req, res){
            var name = req.params.name;
            mongoDBCore.getAnimation(name, function(err, result){
                if(result){
                    ibuddymanager.sendAnimation(result.sequences, function(status){
                        if(status){
                            res.send(200, "Sent Animation to device.");
                        }else{
                            res.send(200, "Sent Animation to device has failed.");
                        }
                    });
                }else{
                    res.send(200, 'Animation not found.');
                }
            });
        }
    };
    return self;
};