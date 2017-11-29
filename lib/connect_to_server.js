
var RunnerActions = require('./runner/runner_actions');
var startClient = require('./runner/client_runner');
var readFromConfigFile = require('./runner/credentials_config_file').readFromConfigFile;

/**
 * ~~~~~~~~~~ Running the system: ~~~~~~~~~~~~~
 *
 *   From command line:
 *      npm start $ACTION
 *
 *   From IDE:
 *      Set the value of the `actionIfNoArgs`
 *      Run this file from the IDE.
 *
 *   Available actions:
 *        * getNewRoundDescription    - Get the round description (call once per round).
 *        * testConnectivity          - Test you can connect to the server (call any number of time)
 *        * deployToProduction        - Release your code. Real requests will be used to test your solution.
 *                                      If your solution is wrong you get a penalty of 10 minutes.
 *                                      After you fix the problem, you should deploy a new version into production.
 *
 *   To run your unit tests locally:
 *      npm test
 *
 * ~~~~~~~~~~ The workflow ~~~~~~~~~~~~~
 *
 *   +------+-----------------------------------------+-----------------------------------------------+
 *   | Step |          IDE                            |         Web console                           |
 *   +------+-----------------------------------------+-----------------------------------------------+
 *   |  1.  |                                         | Start a challenge, should display "Started"   |
 *   |  2.  | Run "getNewRoundDescription"            |                                               |
 *   |  3.  | Read description from ./challenges      |                                               |
 *   |  4.  | Implement the required method in        |                                               |
 *   |      |   ./lib/solutions                       |                                               |
 *   |  5.  | Run "testConnectivity", observe output  |                                               |
 *   |  6.  | If ready, run "deployToProduction"      |                                               |
 *   |  7.  |                                         | Type "done"                                   |
 *   |  8.  |                                         | Check failed requests                         |
 *   |  9.  |                                         | Go to step 2.                                 |
 *   +------+-----------------------------------------+-----------------------------------------------+
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