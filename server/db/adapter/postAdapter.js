var models = require('../models');
var Post = models.Post;
var User = models.User;
var Pledge = models.Pledge;
var Q = require('q');

var createPost = function(req, res, next) {
  Q.all([
    User.where({username: req.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return user[0];
    }),
    Post.save(req.body),
    Pledge.where({pledgename: req.body.pledgename})
    .then(function(pledge) {
      if (pledge.length === 0) throw new Error ('Pledge not found');
      return pledge[0];
    })
  ])
  .spread(function(user,post,pledge) {
    return Q.all([
      User.relate(user,'POSTED',post),
      User.relate(post,'POSTED_IN',pledge)
    ]);
  })
  .then(function(result) {
    res.send(result);
  })
  .catch(next);
};

var createComment = function(req, res) {
  res.send('postAdapter.createComment');
};

var likePost = function(req, res) {
  res.send('postAdapter.likePost');
};

module.exports = {
  createPost: createPost,
  createComment: createComment,
  likePost: likePost
};
