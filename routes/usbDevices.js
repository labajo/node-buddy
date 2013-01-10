


module.exports = function(ibuddycore, vendorId, productId, logger){

    var self = {
        getAllDevices : function(req, res){
            logger.info('Getting all HID usb devices.');
            ibuddycore.getAllDevices(function(devices){
                res.send(200, JSON.stringify(devices));
            });
        },
        getDevices : function(req, res){
            logger.info('Getting all HID usb devices with vendorId: ' + vendorId + ' and productId: '+ productId);
            ibuddycore.getDevices(vendorId, productId, function(devices){
                res.send(200, JSON.stringify(devices));
            });
        },
        getUsbPath : function(req, res){
            logger.info('Getting usbPath with vendorId: ' + vendorId + ' and productId: '+ productId);
            ibuddycore.getDevices(vendorId,productId,function(devices){
                ibuddycore.getUsbPathVP(vendorId, productId, devices,function(err, usbPath){
                    res.send(200, JSON.stringify(usbPath));
                });
            });
        }
    };
    return self;
}