var assert = require('assert');
var proxyquire = require('proxyquire').noCallThru();

var fakeData = proxyquire('../index.js', {
  './data/names.json': ['Jack Franklin', 'Jeffrey Way'],
  './data/emails.json': ['a@b.com', 'b@c.com']
});

describe('fakeData names method', function() {
  it('defaults to 1 if no count given', function() {
    var name = fakeData.names();
    assert(name == 'Jack Franklin' || name == 'Jeffrey Way', 'The name should be Jack F or Jeffrey W');
  });

  it('gives us back one name if we pass in one', function() {
    var name = fakeData.names(1);
    assert(name == 'Jack Franklin' || name == 'Jeffrey Way');
  });

  it('gives us back two names if we pass in 2', function() {
    var names = fakeData.names(2);
    assert(names.indexOf('Jack Franklin') > -1);
    assert(names.indexOf('Jeffrey Way') > -1);
    assert.equal(names.length, 2);
  });
});

describe('fakeData emails method', function() {
  it('gives us back one email if we pass in one', function() {
    var email = fakeData.emails(1);
    assert(email == 'a@b.com' || email == 'b@c.com');
  });

  it('gives us back two names if we pass in 2', function() {
    var emails = fakeData.emails(2);
    assert(emails.indexOf('a@b.com') > -1);
    assert(emails.indexOf('b@c.com') > -1);
    assert.equal(emails.length, 2);
  });
});
