var db = require('seraph')();
var User = require('seraph-model')(db, 'User');

User.setUniqueKey('username');
User.schema = {
  username: { type: String, required: true },
  hashed_pw: { type: String, required: true }
};
User.fields = Object.keys(User.schema);
User.useTimestamps();

module.exports = User;
