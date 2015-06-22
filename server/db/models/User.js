var db = require('seraph')();
var User = require('seraph-model')(db, 'User');

module.exports = User;
