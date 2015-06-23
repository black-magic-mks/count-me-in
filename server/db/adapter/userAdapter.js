var models = require('../models');
var User = models.User;
var Post = models.Post;
var db = require('seraph')();
var Q = require('q');
var query = Q.nbind(db.query,db);

var getUser = function(req, res, next) {
  var username = req.body.username || req.username;

  User.where({username: username})
  .then(function(user) {
    if (user.length === 0) throw new Error('Username not found');
    res.send(user[0]);
  })
  .catch(next);
};

var getUserRelatedMiddleware = function(relationship) {
  return function(req, res, next) {
    var username = req.body.username || req.username;

    User.where({username: username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return User.getRelated(user[0],relationship);
    })
    .then(function(nodes) {
      res.send(nodes);
    })
    .catch(next);
  };
};

var getUserPosts = getUserRelatedMiddleware('POSTED');
var getUserLikes = getUserRelatedMiddleware('LIKED');
var getUserPledges = getUserRelatedMiddleware('SUBSCRIBES_TO');
var getUserComments = getUserRelatedMiddleware('WROTE');
var getFollowingUsers = getUserRelatedMiddleware('FOLLOWS');

var followUser = function(req, res, next) {
  Q.all([
    User.where({username: req.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return user[0];
    }),
    User.where({username: req.body.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return user[0];
    })
  ])
  .spread(function(me,other) {
    return User.relate(me,'FOLLOWS',other);
  })
  .then(function(follow) {
    console.log(follow);
    res.send(follow);
  })
  .catch(next);
};

module.exports = {
  getUser: getUser,
  getUserPosts: getUserPosts,
  getUserLikes: getUserLikes,
  getUserPledges: getUserPledges,
  getUserComments: getUserComments,
  getFollowingUsers: getFollowingUsers,
  followUser: followUser
};
