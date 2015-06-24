var models = require('../models');
var Post = models.Post;
var User = models.User;
var Pledge = models.Pledge;
var Comment = models.Comment;
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
    ])
    .then(function() { return post; });
  })
  .then(function(post) {
    res.send(post);
  })
  .catch(next);
};

var createComment = function(req, res, next) {
  var postId = req.body.postId;

  Q.all([
    User.where({username: req.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return user[0];
    }),
    Comment.save(req.body),
    Post.read(postId)
    .then(function(post) {
      if (!post) throw new Error('Post ID not found: '+postId);
      return post;
    })
  ])
  .spread(function(user,comment,post) {
    return Q.all([
      User.relate(user,'WROTE',comment),
      Comment.relate(comment,'WRITTEN_IN',post)
    ])
    .then(function() { return comment; });
  })
  .then(function(comment) {
    res.send(comment);
  })
  .catch(next);
};

var likePost = function(req, res, next) {
  var postId = req.body.postId;

  Q.all([
    User.where({username: req.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return user[0];
    }),
    Post.read(postId)
    .then(function(post) {
      if (!post) throw new Error('Post ID not found: '+postId);
      return post;
    })
  ])
  .spread(function(user,post) {
    return User.relate(user,'LIKED',post);
  })
  .then(function(like) {
    res.send(like);
  })
  .catch(next);
};

module.exports = {
  createPost: createPost,
  createComment: createComment,
  likePost: likePost
};
