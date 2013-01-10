/**
 * Created with JetBrains WebStorm.
 * User: labajo
 * Date: 07/01/13
 * Time: 15:06
 * To change this template use File | Settings | File Templates.
 */
var Sync = require('sync');


module.exports = function(iBuddy, logger){

    logger.info('Creating iBuddy Manager.');
    var mainSignal = [0x22, 0x09, 0x00, 0x02, 0x01, 0x00, 0x00, 0x00];
    var baseSignal = [0x55, 0x53, 0x42, 0x43, 0x00, 0x40, 0x02];
    var finalSequence = {headColor:'none', heart:'false', wings:'false', left:'false', right:'false', timeout:10};
    var white = 112;
    var cyan = 96;
    var purple = 80;
    var blue = 64;
    var yellow = 48;
    var green = 32;
    var red = 16;
    var heart = 128;
    var wingsOff = 4;
    var wingsOn = 8;
    var right = 2;
    var left = 1;

    function analyzeSequence(sequence) {
        var result = baseSignal.slice(0, baseSignal.length);
        var base = 255;
        if(sequence['headColor']){
            var factor = analyzeHeadColor(sequence['headColor']);
            base = base - factor;
        }

        if(sequence['wings'] === 'false'){
            base = base - wingsOff;
        }else{
            base = base - wingsOn;
        }

        if(sequence['heart'] === 'true'){
            base = base - heart;
        }

        if((sequence['right']==='true')&&(sequence['left']==='false')){
            base = base - right;
        }
        if((sequence['left']==='true')&&(sequence['right']==='false')){
            base = base - left;
        }

        result.push(base);
        logger.info('mainSignal: ' + mainSignal.toString());
        logger.info('commandSignal: ' + result.toString());

        return result;
    }

    function analyzeHeadColor(color){
        if(color==='white'){
            return white;
        }else if(color==='cyan'){
            return cyan;
        }else if(color==='purple'){
            return purple;
        }else if(color==='blue'){
            return blue;
        }else if(color==='yellow'){
            return yellow;
        }else if(color==='green'){
            return green;
        }else if(color==='red'){
            return red;
        }else{
            return 0;
        }

    }

    function sendDeviceCommand(sequence,callback){
        var command = analyzeSequence(sequence);
        logger.info('Sending command to Device...');
        var counter = 0;
        var error;
        do{
            try{
                iBuddy.write(mainSignal);
                iBuddy.write(command);
                error = null;
            }catch(err){
                error = err;
                counter = counter + 1 ;
            }
        }while(error || counter < 5);
        if((counter === 5)||(error)){
            callback(false);
        }else{
            callback(true);
        }
    }

    var self= {
        sendCommand: sendDeviceCommand,
        sendAnimation: function(animation, callback){
            callback(true);
            var sequence = {headColor:'none', heart:'false', wings:'false', left:'false', right:'false', timeout:50};
            animation.push(sequence);
            Sync(function(){
                logger.info('Sending animation to Device...');
                for(var i = 0; i< animation.length;i++){
                    var seq = animation[i];
                    sendDeviceCommand(seq, function(status){
                        if(status){
                            logger.info('Waiting ' + seq['timeout'] + ' milliseconds.');
                            Sync.sleep(seq['timeout']);
                        }
                    });
                }
                /*sendDeviceCommand(finalSequence, function(status){
                    if(status){
                        Sync.sleep(finalSequence['timeout']);
                    }
                });*/
            });
        }
    }

    return self;
}