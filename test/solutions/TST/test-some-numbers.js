const test = require("ava");
const one = require('../../../lib/solutions/TST/one');
// noinspection JSUnusedLocalSymbols
const two = require('../../../lib/solutions/TST/two');

test("show one", function(t){
    t.is(one(), 1);
});
