var models = require('../models');
var Pledge = models.Pledge;
var User = models.User;
var Post = models.Post;
var Q = require('q');

var getPledge = function(req, res, next) {
  Pledge.where({pledgename: req.body.pledgename})
  .then(function(pledge) {
    if (pledge.length === 0) throw new Error('Pledge not found');
    return pledge[0];
  })
  .then(function(pledge) {
    return Pledge.addHasSubscribed(req.username,pledge);
  })
  .then(function(pledge) {
    res.send(pledge);
  })
  .catch(next);
};

var getAllPledges = function(req, res, next) {
  Pledge.findAll()
  .then(function(pledges) {
    return Q.all(pledges.map(function(pledge) {
      return Pledge.read(pledge)
      .then(function(pledge) {
        return Pledge.addHasSubscribed(req.username,pledge);
      });
    }));
  })
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
    return Q.all(posts.map(function(post) {
      return Post.read(post)
      .then(function(post) {
        return Post.addHasLiked(req.username,post);
      });
    }));
  })
  .then(function(posts) {
    console.log(posts);
    return posts.sort(function(post1, post2) {
      return post2.created - post1.created;
    })
    return posts;
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
