'use strict';

var TDL = require('tdl-client');

module.exports.getNewRoundDescription = {
    name: "getNewRoundDescription",
    clientAction: TDL.ClientActions.stop()
};
module.exports.testConnectivity = {
    name: "testConnectivity",
    clientAction: TDL.ClientActions.stop()
};
module.exports.deployToProduction = {
    name: "deployToProduction",
    clientAction: TDL.ClientActions.publish()
};

module.exports.all = [
    module.exports.getNewRoundDescription,
    module.exports.testConnectivity,
    module.exports.deployToProduction
];