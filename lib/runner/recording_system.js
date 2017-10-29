'use strict';

var unirest = require('unirest');

const RECORDING_SYSTEM_ENDPOINT = "http://localhost:41375";

String.prototype.startsWith = function(suffix) {
    return this.indexOf(suffix, 0) === 0;
};

module.exports.ifRunning = function (callback, errorCallback) {
    // noinspection JSUnresolvedFunction
    unirest
        .get(RECORDING_SYSTEM_ENDPOINT+'/status')
        .end(function (response) {
            if (response.error) {
                console.log("Could not reach recording system: " + response.error);
                errorCallback();
                return
            }

            if (response.code === 200 && response.body.startsWith("OK")) {
                callback();
                return
            }

            errorCallback()
        });
};

module.exports.notifyEvent = function (lastFetchedRound, shortName) {
    console.log("Notify round \""+lastFetchedRound+"\", event \""+shortName+"\"");
    unirest
        .post(RECORDING_SYSTEM_ENDPOINT+'/notify')
        .send(lastFetchedRound + '/' + shortName)
        .end(function (response) {
            if (response.error) {
                console.log("Could not reach recording system: " + response.error);
                return;
            }

            if (response.code !== 200) {
                console.log("Recording system returned code: " + response.code);
                return;
            }

            if (!response.body.startsWith("ACK")) {
                console.log("Recording system returned body:" + response.body);
            }
        })
};
