var db = require('seraph')();
var User = require('seraph-model')(db, 'User');

User.setUniqueKey('username');
User.schema = {
  username: { type: String, required: true }
};

module.exports = User;
