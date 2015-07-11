var db;

if (process.env.NODE_ENV === 'production') {
  var url = require('url').parse(process.env.GRAPHENEDB_URL)
  db = require('seraph')({
    server: url.protocol + '//' + url.host,
    user: url.auth.split(':')[0],
    pass: url.auth.split(':')[1]
  });
} else {
  db = require('seraph')();
}
var User = require('seraph-model')(db, 'User');

User.setUniqueKey('username');
User.schema = {
  username: { type: String, required: true },
  hashed_pw: { type: String, required: true }
};
User.fields = Object.keys(User.schema);
User.useTimestamps();

module.exports = User;
