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

var Pledge = require('seraph-model')(db, 'Pledge');

Pledge.setUniqueKey('pledgename');
Pledge.schema = {
  pledgename: { type: String, required: true }
};
Pledge.fields = Object.keys(Pledge.schema);
Pledge.useTimestamps();

module.exports = Pledge;
