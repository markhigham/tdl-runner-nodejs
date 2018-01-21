'use strict';

var TDL = require('tdl-client');
var ConfigFile = require('./credentials_config_file');

module.exports.getConfig = function() {
    return TDL.ChallengeSessionConfig
        .forJourneyId(ConfigFile.readFromConfigFile('tdl_journey_id'))
        .withServerHostname(ConfigFile.readFromConfigFile('tdl_hostname'))
        .withColours(ConfigFile.isTrue(ConfigFile.readFromConfigFileWithDefault('tdl_use_coloured_output', 'true')))
        .withRecordingSystemShouldBeOn(ConfigFile.isTrue(ConfigFile.readFromConfigFileWithDefault('tdl_require_rec', 'true')))
        .withWorkingDirectory('./');
};

module.exports.getRunnerConfig = function() {
    return new TDL.ImplementationRunnerConfig()
        .setUniqueId(ConfigFile.readFromConfigFile('tdl_username'))
        .setHostname(ConfigFile.readFromConfigFile('tdl_hostname'));
};
