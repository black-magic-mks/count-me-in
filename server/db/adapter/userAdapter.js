var User = require('../model/User');

var getUser = function(req, res) {
  var username = req.body.username;
  User.read({username: username}, function(err, user) {
    console.log(user);
    res.send(user);
  });
};

var getMe = function(req, res) {
  res.send('userAdapter.getMe');
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
