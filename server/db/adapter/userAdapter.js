var models = require('../models');
var User = models.User;

var getUser = function(req, res, next) {
  var username = req.body.username;

  User.where({username: username})
  .then(function(user) {
    if (user.length === 0) {
      throw new Error('Username not found');
    } else {
      res.send(user[0]);
    }
  })
  .catch(next);
};

var getMe = function(req, res, next) {
  User.where({username: req.username})
  .then(function(user) {
    res.send(user[0]);
  })
  .catch(next);
};

var getUserPosts = function(req, res, next) {
  res.send('userAdapter.getUserPosts');
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
  getMe: getMe,
  getUserPosts: getUserPosts,
  getUserLikes: getUserLikes,
  getUserPledges: getUserPledges,
  getUserComments: getUserComments,
  getFollowingUsers: getFollowingUsers,
  followUser: followUser
};
