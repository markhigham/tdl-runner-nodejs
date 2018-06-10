const test = require("ava");
const sum = require('../../../lib/solutions/SUM/sum');

test("compute sum", function(t) {
    t.is(sum(1, 2), 3);
});
