var assert = require('assert');
var proxyquire = require('proxyquire').noCallThru();

var fakeData = proxyquire('../index.js', {
  './data/names.json': ['Jack Franklin', 'Jeffrey Way']
});

describe('fakeData names method', function() {
  it('gives us back one name if we pass in one', function() {
    var name = fakeData.names(1);
    assert(name == 'Jack Franklin' || name == 'Jeffrey Way');
  });
});
