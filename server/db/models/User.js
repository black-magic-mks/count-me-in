var db = require('seraph')();
var User = require('seraph-model')(db, 'User');

User.setUniqueKey('username');
User.schema = {
  username: { type: String, required: true }
};
User.fields = Object.keys(User.schema);

module.exports = User;
