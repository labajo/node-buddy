/**
 * Created with JetBrains WebStorm.
 * User: labajo
 * Date: 06/01/13
 * Time: 22:20
 * To change this template use File | Settings | File Templates.
 */

var HID = require('HID');

module.exports = function(logger){

    var auxIBuddy;
    var self= {
        iBuddy: function(){
            return auxIBuddy;
        },
        getStatus: function(callback){
            logger.info('Getting device status....');
            if(iBuddy){
              callback(true);
            }  else{
              callback(false);
            }
        },
        getAllDevices: function(callback){
            logger.info('Getting all devices.');
            var devices = HID.devices();
            callback(devices);
        },

        getDevices: function(vendorId, productId, callback){
            logger.info('Getting devices with vendorId ' + vendorId + ' and productId ' + productId  );
            var devices = HID.devices(vendorId, productId);
            callback(devices);
        },
        getUsbPath: function(devices, callback){
            var usbPath;
            logger.info('Getting usbPath from devices');
            for(device in devices){
                var usbHid = devices[device];
                if(usbHid['product']==='i-Buddy'){
                    usbPath = usbHid['path'];
                    logger.info('UsbPath setted to ' + usbHid['path']);
                    callback(null, usbPath);
                }
            }
            if(!usbPath){
                callback('Device not found', usbPath);
            }
        },
        getUsbPathVP: function(vendorId, productId, devices, callback){
            var usbPath;
            logger.info('Getting usbPath from devices');
            for(device in devices){
                var usbHid = devices[device];
                if((usbHid['productId']===productId)&&(usbHid['vendorId']===vendorId)){
                    usbPath = usbHid['path'];
                    logger.info('UsbPath setted to ' + usbHid['path']);
                    callback(null, usbPath);
                }
            }
            if(!usbPath){
                callback('Device not found', usbPath);
            }
        },
        connectDevice: function(usbPath, callback){
            logger.info('Connecting to device...');
            if(!auxIBuddy){
                auxIBuddy = new HID.HID(usbPath);
            }
            callback(auxIBuddy);
        }

    }
    return self;
}





