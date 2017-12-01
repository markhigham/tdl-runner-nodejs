
var RunnerActions = require('./runner/runner_actions');
var startClient = require('./runner/client_runner');
var readFromConfigFile = require('./runner/credentials_config_file').readFromConfigFile;

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
 **/
var args = process.argv.slice(2, process.argv.length);
startClient(args, {
    username: readFromConfigFile('tdl_username'),
    hostname: readFromConfigFile('tdl_hostname'),
    actionIfNoArgs: RunnerActions.testConnectivity,
    solutions: {
        'sum': require('./solutions/sum'),
        'hello': require('./solutions/hello'),
        'fizz_buzz': require('./solutions/fizz_buzz'),
        'checkout': require('./solutions/checkout')
    }
});