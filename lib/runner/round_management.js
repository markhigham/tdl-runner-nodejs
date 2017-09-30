'use strict';

const CHALLENGES_FOLDER = require('path').resolve(__dirname, '../../challenges');
const LAST_FETCHED_ROUND_PATH = CHALLENGES_FOLDER + "/" + "XR.txt";

var fs = require('fs');

module.exports.displayAndSaveDescription = function displayAndSaveDescription(label, description) {
    console.log('Starting round: %s', label);
    console.log(description);

    fs.writeFileSync(CHALLENGES_FOLDER + "/" + label + ".txt", description);
    console.log("Challenge description saved to file: " + CHALLENGES_FOLDER + "/" + label + ".txt" + ".");

    fs.writeFileSync(LAST_FETCHED_ROUND_PATH, label);
    return 'OK'
};

module.exports.getLastFetchedRound = function () {
    try {
        return fs.readFileSync(LAST_FETCHED_ROUND_PATH, 'utf8');
    } catch (ex) {
        return "noRound"
    }
};