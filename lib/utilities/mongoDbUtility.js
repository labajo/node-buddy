var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON;

module.exports = function(mongoConf, logger){
    var mongoDbConnection;

    var self = {
        createDb : function(callback){
            var db = new Db(mongoConf['dbName'], new Server(mongoConf['serverIp'], mongoConf['port'],
                {auto_reconnect: true, poolSize: 10}), {safe:false, native_parser: false});
            db.open(function(err, db){
                mongoDbConnection = db;
                callback(err,db);
            });
        },
        getDb : function(){
            return mongoDbConnection;
        },
        insertAnimation: function(anim, callback){
            logger.debug('Inserting ' + anim['_id']+ ' animation from MongoDb...');
            var collection = mongoDbConnection.collection(mongoConf['animCollection']);
            collection.update({_id:anim['_id']}, {_id:anim['_id'],sequences:anim['sequences']}, {upsert: true});
            callback(null,null);
        },
        getAnimation: function(animName, callback){
            logger.debug('Getting animation from MongoDb...');
            var collection = mongoDbConnection.collection(mongoConf['animCollection']);
            collection.findOne({_id:animName}, function(err, doc) {
                callback(err, doc);
            });
        }
    }
    return self;
}