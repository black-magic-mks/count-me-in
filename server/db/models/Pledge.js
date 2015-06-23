var db = require('seraph')();
var Pledge = require('seraph-model')(db, 'Pledge');

Pledge.setUniqueKey('pledgename');
Pledge.schema = {
};
Pledge.fields = Object.keys(Pledge.schema);

module.exports = Pledge;
