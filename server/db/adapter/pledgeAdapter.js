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
  Q.all([
    User.where({username: req.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return user[0];
    }),
    Pledge.where({pledgename: req.body.pledgename})
    .then(function(pledges) {
      if (pledges.length !== 0) {
        return [pledges[0]];
      }
      return pledges;
    }),
    User.where({username: req.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return User.getRelated(user[0],'SUBSCRIBES_TO');
    })
  ])
  .spread(function(user, pledge, userSubscribedTo) {
    // check if pledge exists
    // if it does, check it user is subscribed to it
    // if not, build it and subscribe
    // if the user isn't subscribed to the pledge and the pledge doesn't exist, then make the pledge and subscribe the user
    if (pledge.length === 0) {
      Pledge.save(req.body)
      .then(function(pledge) {
        return User.relate(user,'SUBSCRIBES_TO',pledge);
      })
    } else {
      for (var i = 0; i < userSubscribedTo.length; i++) {
        if (userSubscribedTo[i].pledgename === pledge[0].pledgename) {
          return;
        }
      }
      return User.relate(user,'SUBSCRIBES_TO',pledge);
    }
  })
  .then(function() {
    res.send(true);
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
    }),
    User.where({username: req.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return User.getRelated(user[0],'SUBSCRIBES_TO');
    })
  ])
  .spread(function(user,pledge, userSubscribedTo) {
    for (var i = 0; i < userSubscribedTo.length; i++) {
      if (userSubscribedTo[i].pledgename === pledge.pledgename) {
        return;
      }
    }
    return User.relate(user,'SUBSCRIBES_TO',pledge);
  })
  .then(function() {
    res.send(true);
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
    })
    .sort(function(post1, post2) {
      return post2.created - post2.created;
    })
    );
  })
  // .then(function(posts) {
  //   posts.spread()
  //   return posts.sort(function(post1, post2) {
  //     return post2.created - post1.created;
  //   });
  // })
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
