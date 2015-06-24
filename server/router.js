var authAdapter = require('./db/adapter/authAdapter');
var userAdapter = require('./db/adapter/userAdapter');
var pledgeAdapter = require('./db/adapter/pledgeAdapter');
var postAdapter = require('./db/adapter/postAdapter');
var testAdapter = require('./db/adapter/testAdapter');

var routes = {
  'get': {
    '/api/user': userAdapter.getUser,
    '/api/user/posts': userAdapter.getUserPosts,
    '/api/user/likes': userAdapter.getUserLikes,
    '/api/user/pledges': userAdapter.getUserPledges,
    '/api/user/comments': userAdapter.getUserComments,
    '/api/user/following': userAdapter.getFollowingUsers,
    '/api/pledge': pledgeAdapter.getPledge,
    '/api/pledge/users': pledgeAdapter.getPledgeUsers,
    '/api/pledge/posts': pledgeAdapter.getPledgePosts,
    '/api/test/clear': testAdapter.clearData,
    '/api/test/fill': testAdapter.fillData
  },
  'post': {
    '/api/auth/login': authAdapter.login,
    '/api/auth/logout': authAdapter.logout,
    '/api/auth/register': authAdapter.register,
    '/api/user/follow': userAdapter.followUser,
    '/api/pledge': pledgeAdapter.createPledge,
    '/api/pledge/subscribe': pledgeAdapter.subscribeToPledge,
    '/api/post/new': postAdapter.createPost,
    '/api/post/comment': postAdapter.createComment,
    '/api/post/like': postAdapter.likePost
  }
};

var addRoutes = function(server) {
  for (var method in routes) {
    for (var route in routes[method]) {
      server[method](route, routes[method][route]);
    }
  }
};

module.exports = {
  addRoutes: addRoutes
};

