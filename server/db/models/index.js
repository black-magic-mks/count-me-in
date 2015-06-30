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

Post = prepareModel(Post);
Post.addHasLiked = function(username, post) {
  if (!username) return Q(post);
  return query([
    'MATCH (:User {username:{user}})-[like:LIKED]->(p)',
    'WHERE id(p)={post}',
    'RETURN like'
  ].join(' '),
  {
    user: username,
    post: post.id
  })
  .then(function(like) {
    return [Post.read(post),!!like.length];
  })
  .spread(function(post,hasLiked) {
    post.hasLiked = hasLiked;
    return post;
  });
};

module.exports = {
  User: prepareModel(User),
  Pledge: prepareModel(Pledge),
  Post: Post,
  Comment: prepareModel(Comment)
};
