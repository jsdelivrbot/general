var _ = require('underscore');

var getters = require('./getters.js');

var fakeData = {
  namesData: require('./data/names.json'),
  emailsData: require('./data/emails.json')
}

getters(fakeData);

fakeData.obj = require('./obj.js');

module.exports = fakeData;
