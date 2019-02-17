var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = require("assert");
const sum = require("../../../lib/solutions/SUM/sum");

/*
 - param[0] = a positive integer between 0-100
 - param[1] = a positive integer between 0-100
 - @return = an Integer representing the sum of the two numbers
 */

describe("SUM challenge: adding two numbers", function() {
  it("should reject invalid inputs", function() {
    assert.throws(function() {
      sum(undefined, 20);
    });
  });

  it("should only accept 0-100 for param[0]", function() {
    assert.throws(function() {
      sum(101, 2);
    });
  });

  it("should reject invalid input for param[1]", function() {
    assert.throws(function() {
      sum(22, -1000);
    });
  });

  it("should return 3, which is the sum of 1 and 2", function() {
    assert.equal(sum(1, 2), 3);
  });
});
