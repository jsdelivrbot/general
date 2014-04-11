var fakeData = require('./index.js');


var users = fakeData.obj(5, {
  name: true,
  email: true
});

console.log(users);
