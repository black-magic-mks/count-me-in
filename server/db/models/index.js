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

User = prepareModel(User);
User.addHasFollowed = function(username, followed) {
  if (!username) return Q(followed);
  return query([
    'MATCH (:User {username:{username}})-[follow:FOLLOWS]->(u)',
    'WHERE id(u)={followed}',
    'RETURN follow'
  ].join(' '),
  {
    username: username,
    followed: followed.id
  })
  .then(function(follow) {
    return [User.read(followed),!!follow.length];
  })
  .spread(function(followed,hasFollowed) {
    followed.hasFollowed = hasFollowed;
    return followed;
  });
};

Pledge = prepareModel(Pledge);
Pledge.addHasSubscribed = function(username, pledge) {

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
  User: User,
  Pledge: Pledge,
  Post: Post,
  Comment: prepareModel(Comment)
};
