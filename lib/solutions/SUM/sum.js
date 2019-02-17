"use strict";

module.exports = function(x, y) {
  if (isNaN(x) || x > 100 || x < 0)
    throw new Error("x must be between  0 and 100");

  if (isNaN(y) || y > 100 || y < 0)
    throw new Error("y must be between 0 and 100");

  const result = x + y;
  return result;
};
