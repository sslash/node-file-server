var nconf = require('nconf');
var path = require('path');
var packageInfo = require('./package');

var appRoot = path.resolve(__dirname);
var appName = packageInfo.name;

nconf.argv()
    .env()
    .defaults({
        /* The port to bind */
        HTTP_PORT: 8080,

        HTTP_HOST: '192.168.1.7'
    });

module.exports = nconf;
