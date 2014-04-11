var assert = require('assert');
var proxyquire = require('proxyquire').noCallThru();

var fakeData = proxyquire('../index.js', {
  './data/names.json': ['Jack Franklin', 'Jeffrey Way'],
  './data/emails.json': ['a@b.com', 'b@c.com']
});

describe('fadeData obj method', function() {
  it('returns an array of objects', function() {
    var result = fakeData.obj(1, {
      name: true
    });
    assert.equal(result.length, 1)
    var name = result[0].name;
    assert(name == 'Jack Franklin' || name == 'Jeffrey Way');
  });
  it('returns an array of objects with the specified properties', function() {
    var result = fakeData.obj(1, {
      name: true,
      email: true
    });
    assert.equal(result.length, 1)
    var name = result[0].name;
    var email = result[0].email;
    assert(name == 'Jack Franklin' || name == 'Jeffrey Way');
    assert(email == 'a@b.com' || email == 'b@c.com');
  });
});
