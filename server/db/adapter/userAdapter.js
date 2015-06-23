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

var followUser = function(req, res) {
  res.send('userAdapter.followUser');
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
