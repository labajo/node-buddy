
/**
 * Module dependencies.
 */


var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    fs = require('fs');

var conf = require('./lib/utilities/configUtility')(__dirname + '/configuration/mainConfig.json');
var logger = require('./lib/utilities/loggerUtility')(conf.get('logFile'));
var ibuddycore = require('./lib/ibuddycore')(logger);

var ibuddymanager;
ibuddycore.getDevices(conf.get('vendorId'),conf.get('productId'),function(devices){
    ibuddycore.getUsbPath(devices,function(err, usbPath){
        if(!err){
            ibuddycore.connectDevice(usbPath, function(ibuddy){
                ibuddymanager = require('./lib/ibuddymanagement')(ibuddy,logger);
            });
        }
    });
});

var mongoDBCore = require('./lib/utilities/mongoDbUtility')(conf.get('mongoConf'), logger);

var database
mongoDBCore.createDb(function(err, db){
    database = db;
    logger.info('Mongo database connected.');
});


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || conf.get('port'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//Web Area.
app.get('/web/animations', routes.main(logger).animations);
app.get('/web/animations/add', routes.main(logger).addAnimation);


app.get('/getAllDevices', routes.usbDevices(ibuddycore, conf.get('vendorId'), conf.get('productId'), logger).getAllDevices);
app.get('/getDevices', routes.usbDevices(ibuddycore, conf.get('vendorId'), conf.get('productId'), logger).getDevices);
app.get('/getUsbPath', routes.usbDevices(ibuddycore, conf.get('vendorId'), conf.get('productId'), logger).getUsbPath);
app.get('/headColor/:color', routes.iBuddy(ibuddymanager, mongoDBCore, logger).headColor);
app.get('/anim1', routes.iBuddy(ibuddymanager, mongoDBCore, logger).animation);
app.get('/animations/:name', routes.iBuddy(ibuddymanager, mongoDBCore, logger).playAnimation);
app.post('/web/animations', routes.iBuddy(ibuddymanager, mongoDBCore, logger).addAnimation);


app.get('/testEvent', function(req,res){
    fs.readFile('./testEvent.txt','utf8', function (err, data) {
        if (err){
            throw err
        };
        res.send(200, data);
    });
});


http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});




