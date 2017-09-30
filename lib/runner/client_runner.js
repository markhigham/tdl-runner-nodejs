'use strict';

var TDL = require('tdl-client');
var publish = TDL.ClientActions.publish;

var RunnerActions = require('./runner_actions');
var RecordingSystem = require('./recording_system');
var RoundManagement = require('./round_management');
var readFromConfigFileWithDefault = require('./credentials_config_file').readFromConfigFileWithDefault;
var sum = require('./../solutions/sum');
var hello = require('./../solutions/hello');
var fizz_buzz = require('./../solutions/fizz_buzz');
var checkout = require('./../solutions/checkout');

// ~~~~~~~~~ Setup ~~~~~~~~~

function startClient(args, options) {
    var doStart = function () {
        var valueFromArgs = extractActionFrom(args);
        var runnerAction = valueFromArgs === undefined ? options.actionIfNoArgs : valueFromArgs;
        console.log("Chosen action is: %s", runnerAction.name);

        var client = new TDL.Client({hostname: options.hostname, uniqueId: options.username});

        var rules = new TDL.ProcessingRules();
        rules.on('display_description').call(RoundManagement.displayAndSaveDescription).then(publish());
        rules.on('sum').call(sum).then(runnerAction.clientAction);
        rules.on('hello').call(hello).then(runnerAction.clientAction);
        rules.on('fizz_buzz').call(fizz_buzz).then(runnerAction.clientAction);
        rules.on('checkout').call(checkout).then(runnerAction.clientAction);

        client.goLiveWith(rules);

        //TODO chain this action after client.goLiveWith
        RecordingSystem.notifyEvent(RoundManagement.getLastFetchedRound(), runnerAction.shortName);
    };

    ifRecordingSystemOk(
        doStart,
        function () {
            console.log("Please run `record_screen_and_upload` before continuing.");

        }
    );
}

function extractActionFrom(args) {
    var firstArg = args.length > 0 ? args[0] : "";

    return RunnerActions.all.filter(function (action) {
        return action.name.toLowerCase() === firstArg.toLowerCase();
    }).shift()
}

function ifRecordingSystemOk(callback, errorCallback) {
    var requireRecording = isTrue(readFromConfigFileWithDefault("tdl_require_rec", "true"));

    //noinspection SimplifiableIfStatement,RedundantIfStatementJS
    if (requireRecording) {
        return RecordingSystem.ifRunning(callback, errorCallback);
    } else {
        return callback();
    }
}

function isTrue(value) {
    return value.toString() === 'true'
}

//~~~~~~~ Provided implementations ~~~~~~~~~~~~~~

module.exports = startClient;