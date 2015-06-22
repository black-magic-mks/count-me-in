var User = require('./User');
var Pledge = require('./Pledge');
var Post = require('./Post');
var Comment = require('./Comment');

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

var addGetRelated = function(model,seraphModel) {
  var type = seraphModel.type;
  var key = seraphModel.uniqueness.key;

  var getRelated = function(node,rel) {
    var cypher = [
      'MATCH (:' + type + ' {' + key + ':{node}.' + key + '})',
      '-[:' + rel + ']->(x) ',
      'RETURN x'
    ].join('');

    return query(cypher,{node:node});
  };

  model.getRelated = getRelated;
  return model;
};

var prepareModel = function(seraphModel) {
  return addGetRelated(promisifyModel(seraphModel),seraphModel);
};


module.exports = {
  User: prepareModel(User),
  Pledge: prepareModel(Pledge),
  Post: prepareModel(Post),
  Comment: prepareModel(Comment)
};
