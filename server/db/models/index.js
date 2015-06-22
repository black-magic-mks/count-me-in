var User = require('./User');
var Pledge = require('./Pledge');
var Post = require('./Post');
var Comment = require('./Comment');
var Q = require('q');

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

module.exports = {
  User: promisifyModel(User),
  Pledge: promisifyModel(Pledge),
  Post: promisifyModel(Post),
  Comment: promisifyModel(Comment)
};
