var _ = require('underscore');

var getters = function(fakeData) {
  ['names', 'emails'].forEach(function(name) {
    fakeData[name] = function(count) {
      if(!count) count = 1;
      return _.sample(this[name + "Data"], count);
    }
  });
}

module.exports = getters;
