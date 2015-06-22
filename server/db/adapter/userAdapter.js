var models = require('../models');
var User = models.User;
var db = require('seraph')();

var getUser = function(req, res) {
  var username = req.body.username;
  console.log(username);
  User.where({username: username})
  .then(function(user) {
    console.log(user);
    res.send(user);
  });
};

var getMe = function(req, res) {
  console.log(db.relate);
  User.where({username: req.username})
  .then(function(user) {
    console.log(user);
    res.send(user);
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error getting current user");
  });

  db.find({username: req.username}, function(err, user) {
    db.readLabels(user, function(err, rel) {
      console.log(rel);
    });
  });
};

var getUserPosts = function(req, res) {
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
