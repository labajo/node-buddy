node-buddy
==========

node-buddy allows to manage a i-buddy device using a node.js application.


###Steps:

####Check Configuration Values:

```json
{
    "_comment": "my ibuddy has 4400 as vendorId and 5 as productId.",
    "port" :3000,
    "vendorId": 4400,
    "productId": 5,
    "logFile": "ibuddyApp.log",
    "mongoConf": {
        "serverIp":"localhost",
        "port":27017,
        "dbName":"iBuddy",
        "animCollection": "animations"
    }
}
```

####Install dependencies:

        $ npm install

####Start the server:

        $ node app

####Use the following endpoints:
    * Main web [http://localhost:3000/web/animations](http://localhost:3000/web/animations)
    * Create a new animation [http://localhost:3000/web/animations/add](http://localhost:3000/web/animations/add)
    * Play animation in your i-buddy [http://localhost:3000/animations/{animationName}](http://localhost:3000/animations/{animationName})



