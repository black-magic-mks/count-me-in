var db = require('seraph')();
var Pledge = require('seraph-model')(db, 'Pledge');

Pledge.setUniqueKey('pledgename');
Pledge.schema = {
  pledgename: {String, required: true},
  mission: {String, required: true, trim: true},
  post: String,
  date: Date
};
Pledge.fields = Object.keys(Pledge.schema);

module.exports = Pledge;
