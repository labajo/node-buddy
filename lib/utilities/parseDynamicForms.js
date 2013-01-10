module.exports.parseAnimationForm = function(formData,callback){
    var i = 0;
    var headColor = 'seq_head_color_' + i;
    var heart = 'seq_heart_' + i;
    var wings = 'seq_wings_' + i;
    var left = 'seq_left_' + i;
    var right = 'seq_right_' +i;
    var timeout = 'seq_timeout_' + i;

    var animation = new Animation();
    animation['_id'] = formData['appName'];
    animation.sequences = [];

    while(typeof formData[timeout] != 'undefined'){
        var sequence = new Sequence();
        sequence['headColor'] = formData[headColor];
        sequence['timeout'] = formData[timeout];
        if(typeof formData[heart] !='undefined'){
            sequence['heart'] = 'true';
        } else{
            sequence['heart'] = 'false';
        }
        if(typeof formData[wings] !='undefined'){
            sequence['wings'] = 'true';
        } else{
            sequence['wings'] = 'false';
        }
        if(typeof formData[left] !='undefined'){
            sequence['left'] = 'true';
        } else{
            sequence['left'] = 'false';
        }
        if(typeof formData[right] !='undefined'){
            sequence['right'] = 'true';
        } else{
            sequence['right'] = 'false';
        }
        animation.sequences[i] = sequence;
        i++;
        headColor = 'seq_head_color_' + i;
        heart = 'seq_heart_' + i;
        wings = 'seq_wings_' + i;
        left = 'seq_left_' + i;
        right = 'seq_right_' +i;
        timeout = 'seq_timeout_' + i;
    }
    callback(null, animation);
}

function Sequence(){}
Sequence.prototype.toString = function(){
    return JSON.stringify(this);
}

function Animation(){}
Animation.prototype.toString = function(){
    return JSON.stringify(this);
}


