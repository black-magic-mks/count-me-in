var db = require('seraph')();
var Pledge = require('seraph-model')(db, 'Pledge');

Pledge.setUniqueKey('pledgename');
Pledge.schema = {
  pledgename: { type: String, required: true }
};
Pledge.fields = Object.keys(Pledge.schema);
Pledge.useTimestamps();

module.exports = Pledge;