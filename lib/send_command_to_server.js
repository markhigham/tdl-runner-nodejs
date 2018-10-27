'use strict';

var TDL = require('tdl-client-nodejs');
var UserInputAction = require('./runner/user_input_action');
var utils = require('./runner/utils');

var runner = new TDL.QueryBasedImplementationRunnerBuilder()
    .setConfig(utils.getRunnerConfig())
    .withSolutionFor('checkout', require('./solutions/CHK/checkout'))
    .withSolutionFor('fizz_buzz', require('./solutions/FIZ/fizz_buzz'))
    .withSolutionFor('hello', require('./solutions/HLO/hello'))
    .withSolutionFor('sum', require('./solutions/SUM/sum'))
    .create();

/**
 * ~~~~~~~~~~ Running the system: ~~~~~~~~~~~~~
 *
 *   From IDE:
 *      Run this file from the IDE.
 *
 *   From command line:
 *      npm start
 *
 *   To run your unit tests locally:
 *      npm test
 *
 * ~~~~~~~~~~ The workflow ~~~~~~~~~~~~~
 *
 *   By running this file you interact with a challenge server.
 *   The interaction follows a request-response pattern:
 *        * You are presented with your current progress and a list of actions.
 *        * You trigger one of the actions by typing it on the console.
 *        * After the action feedback is presented, the execution will stop.
 *
 *   +------+-------------------------------------------------------------+
 *   | Step | The usual workflow                                          |
 *   +------+-------------------------------------------------------------+
 *   |  1.  | Run this file.                                              |
 *   |  2.  | Start a challenge by typing "start".                        |
 *   |  3.  | Read description from the "challenges" folder               |
 *   |  4.  | Implement the required method in                            |
 *   |      |   ./lib/solutions                                           |
 *   |  5.  | Deploy to production by typing "deploy".                    |
 *   |  6.  | Observe output, check for failed requests.                  |
 *   |  7.  | If passed, go to step 3.                                    |
 *   +------+-------------------------------------------------------------+
 *
 *   You are encouraged to change this project as you please:
 *        * You can use your preferred libraries.
 *        * You can use your own test framework.
 *        * You can change the file structure.
 *        * Anything really, provided that this file stays runnable.
 *
 **/
var args = process.argv.slice(2, process.argv.length);

TDL.ChallengeSession
    .forRunner(runner)
    .withConfig(utils.getConfig())
    .withActionProvider(new UserInputAction(args))
    .start();
