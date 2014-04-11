var _ = require("underscore");

var randomiser = {
  between: function(low, high) {
    return _.random(low, high);
  }
};

module.exports = randomiser;
