var express = require('express');

var authAdapter = require('./auth');
var userAdapter = require('./db/adapter/userAdapter');
var pledgeAdapter = require('./db/adapter/pledgeAdapter');
var postAdapter = require('./db/adapter/postAdapter');
var testAdapter = require('./db/adapter/testAdapter');

var routes = {
  'get': {
    '/auth/authorized': authAdapter.authorize,
    '/user': userAdapter.getUser,
    '/user/posts': userAdapter.getUserPosts,
    '/user/pledges': userAdapter.getUserPledges,
    '/user/feed': userAdapter.getFeed,
    '/pledge': pledgeAdapter.getPledge,
    '/pledge/all': pledgeAdapter.getAllPledges,
    '/pledge/posts': pledgeAdapter.getPledgePosts,
    '/post': postAdapter.getPost,
    '/post/comments': postAdapter.getPostComments,
    '/test/reset': testAdapter.resetData,
    '/test/fill': testAdapter.fillData,
    '/test/clear': testAdapter.clearData,
    '/public/feed': postAdapter.getPublicFeedPosts
  },
  'post': {
    '/auth/login': authAdapter.login,
    '/auth/logout': authAdapter.logout,
    '/auth/register': authAdapter.register,
    '/user/follow': userAdapter.followUser,
    '/pledge/new': pledgeAdapter.createPledge,
    '/pledge/subscribe': pledgeAdapter.subscribeToPledge,
    '/post/new': postAdapter.createPost,
    '/post/comment': postAdapter.createComment,
    '/post/like': postAdapter.likePost,
    '/post/unlike': postAdapter.unlikePost
  }
};

var createApiRouter = function() {
  var router = express.Router();
  for (var method in routes) {
    for (var route in routes[method]) {
      router[method](route, routes[method][route]);
    }
  }

  return router;
};

module.exports = createApiRouter();

