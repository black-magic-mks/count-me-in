var models = require('../models');
var Pledge = models.Pledge;
var User = models.User;
var Post = models.Post;
var Q = require('q');

var getPledge = function(req, res, next) {
  Pledge.where({pledgename: req.body.pledgename})
  .then(function(pledge) {
    if (pledge.length === 0) throw new Error('Pledge not found');
    res.send(pledge[0]);
  })
  .catch(next);
};

var getAllPledges = function(req, res, next) {
  Pledge.findAll()
  .then(function(pledges) {
    res.send(pledges);
  })
  .catch(next);
};

var createPledge = function(req, res, next) {
  Pledge.save(req.body)
  .then(function(pledge) {
    res.send(pledge);
  })
  .catch(next);
};

var subscribeToPledge = function(req, res, next) {
  Q.all([
    User.where({username: req.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return user[0];
    }),
    Pledge.where({pledgename: req.body.pledgename})
    .then(function(pledge) {
      if (pledge.length === 0) throw new Error('Pledge not found');
      return pledge[0];
    })
  ])
  .spread(function(user,pledge) {
    return User.relate(user,'SUBSCRIBES_TO',pledge);
  })
  .then(function(sub) {
    res.send(sub);
  })
  .catch(next);
};

var getPledgePosts = function(req, res, next) {
  Pledge.where({pledgename: req.body.pledgename})
  .then(function(pledge) {
    if (pledge.length === 0) throw new Error('Pledge not found');
    return Pledge.getRelatedTo(pledge[0],'POSTED_IN');
  })
  .then(function(posts) {
    return Q.all(posts.map(Post.addHasLiked.bind(null,req.username)));
  })
  .then(function(posts) {
    res.send(posts);
  })
  .catch(next);
};


module.exports = {
  getPledge: getPledge,
  getAllPledges: getAllPledges,
  createPledge: createPledge,
  subscribeToPledge: subscribeToPledge,
  getPledgePosts: getPledgePosts
};
