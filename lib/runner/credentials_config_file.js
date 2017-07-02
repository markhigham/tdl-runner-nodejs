'use strict';

var PropertiesReader = require('properties-reader');

function readFromConfigFile(key) {
    var pathToPropertiesFile = require('path').resolve(__dirname, '..', '..','config', 'credentials.config');
    var properties = PropertiesReader(pathToPropertiesFile);
    return properties.get(key);
}

module.exports = readFromConfigFile;