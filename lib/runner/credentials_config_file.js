'use strict';

var PropertiesReader = require('properties-reader');

module.exports.readFromConfigFile = function (key) {
    var properties = readPropertiesFile();
    return properties.getRaw(key);
};


module.exports.readFromConfigFileWithDefault = function (key, defaultValue) {
    var properties = readPropertiesFile();
    var value = properties.getRaw(key);
    return value !== null ? value : defaultValue;
};

//~~~~
function readPropertiesFile() {
    var pathToPropertiesFile = require('path').resolve(__dirname, '..', '..', 'config', 'credentials.config');
    return PropertiesReader(pathToPropertiesFile);
}

