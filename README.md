node-buddy
==========

node-buddy allows to manage a i-buddy device using a node.js application.

Tested on Mac OS X 10.7.5 and node v0.8.16 x64.

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
  ![Animation Portal](http://img46.imageshack.us/img46/5946/googlechromes.png)
  * Play animation in your i-buddy [http://localhost:3000/animations/{animationName}](http://localhost:3000/animations/{animationName})



