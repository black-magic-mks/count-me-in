var User = require('./User');
var Pledge = require('./Pledge');
var Post = require('./Post');
var Comment = require('./Comment');
var rels = require('../rels');

var db = require('seraph')();
var Q = require('q');
var query = Q.nbind(db.query,db);

var promisifyMethods = [
  'read',
  'readComposition',
  'exists',
  'save',
  'saveComposition',
  'push',
  'findAll',
  'where',
  'query',
  'prepare',
  'validate'
];

var promisifyModel = function(model) {
  var newModel = {};
  promisifyMethods.forEach(function(method) {
    newModel[method] = Q.nbind(model[method],model);
  });
  return newModel;
};

var prepareModel = function(seraphModel) {
  return rels.addRelMethods(promisifyModel(seraphModel),seraphModel);
};


module.exports = {
  User: prepareModel(User),
  Pledge: prepareModel(Pledge),
  Post: prepareModel(Post),
  Comment: prepareModel(Comment)
};
