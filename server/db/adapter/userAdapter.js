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

var getUserPosts = function(req, res, next) {
  var username = req.body.username || req.username;

  User.where({username: username})
  .then(function(user) {
    if (user.length === 0) throw new Error('Username not found');
    return User.getRelated(user[0],'POSTED');
  })
  .then(function(posts) {
    res.send(posts);
  })
  .catch(next);
};

var getUserLikes = function(req, res) {
  res.send('userAdapter.getUserLikes');
};

var getUserPledges = function(req, res) {
  res.send('userAdapter.getUserPledges');
};

var getUserComments = function(req, res) {
  res.send('userAdapter.getUserComments');
};

var getFollowingUsers = function(req, res) {
  res.send('userAdapter.getFollowingUsers');
};

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
