const hello = require("../../../lib/solutions/HLO/hello");
const assert = require("assert");

describe("hello unit tests", function() {
  it("should say hello to the world", function() {
    const name = "mark";
    const result = hello(name);

    assert.equal(result, `Hello, ${name}!`);

  });
});
