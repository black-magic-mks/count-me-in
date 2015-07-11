var models = require('../models');
var User = models.User;
var Post = models.Post;
var Pledge = models.Pledge;
var db = require('../seraph');
var Q = require('q');
var query = Q.nbind(db.query,db);

var getUser = function(req, res, next) {
  var username = req.body.username || req.username;
  if (!username) return next('No username given');

  User.where({username: username})
  .then(function(user) {
    if (user.length === 0) throw new Error('Username not found');
    return user[0];
  })
  .then(function(user) {
    return User.addHasFollowed(req.username, user);
  })
  .then(function(user) {
    res.send(user);
  })
  .catch(next);
};

var getUserPosts = function(req, res, next) {
  User.where({username: req.body.username})
  .then(function(user) {
    if (user.length === 0) throw new Error('Username not found');
    return User.getRelated(user[0], "POSTED");
  })
  .then(function(posts) {
    return Q.all(posts.map(Post.addHasLiked.bind(null,req.username)));
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
    var pledgenames = posts.reduce(function(pledges,post) {
      if (!pledges[post.pledgename]) pledges[post.pledgename] = [];
      pledges[post.pledgename].push(post);
      return pledges;
    },{});
    return Q.all(Object.keys(pledgenames).map(function(pledgename) {
      return Pledge.where({pledgename: pledgename})
      .then(function(pledge) {
        pledge = pledge[0];
        return Pledge.addHasSubscribed(req.username,pledge);
      })
      .then(function(pledge) {
        pledge.posts = pledgenames[pledge.pledgename];
        return pledge;
      });
    }));
  })
  .then(function(pledgesWithPosts) {
    for (var i = 0; i < pledgesWithPosts.length; i++) {
      pledgesWithPosts[i].posts = pledgesWithPosts[i].posts.sort(function(post1, post2) {
        return post2.created - post1.created;
      });
    }
    return pledgesWithPosts.sort(function(pledge1, pledge2) {
      return pledge1.posts[0] - pledge2.posts[0];
    })
  })
  .then(function(pledgesWithPosts) {
    res.send(pledgesWithPosts);
  })
  .catch(next);
};

var getUserPledges = function(req, res, next) {
  var username = req.body.username || req.username;

  User.where({username: username})
  .then(function(user) {
    if (user.length === 0) throw new Error('Username not found');
    return User.getRelated(user[0],'SUBSCRIBES_TO');
  })
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

var followUser = function(req, res, next) {
  Q.all([
    User.where({username: req.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return user[0];
    }),
    User.where({username: req.body.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return user[0];
    })
  ])
  .spread(function(me,other) {
    return User.relate(me,'FOLLOWS',other);
  })
  .then(function(follow) {
    res.send(follow);
  })
  .catch(next);
};

var getFeed = function(req, res, next) {
  User.where({username: req.username})
  .then(function(user) {
    if (user.length === 0) throw new Error('Username not found');
    return user[0];
  })
  .then(function(user) {
    return Q.all([
      User.getRelated(user,'FOLLOWS'),
      User.getRelated(user,'SUBSCRIBES_TO')
    ]);
  })
  .spread(function(users,pledges) {
    var userPosts = users.reduce(function(posts,user) {
      return posts.concat(User.getRelated(user,'POSTED'));
    },[]);
    var pledgePosts = pledges.reduce(function(posts,pledge) {
      return posts.concat(Pledge.getRelatedTo(pledge,'POSTED_IN'));
    },[]);
    return Q.all([].concat(userPosts).concat(pledgePosts));
  })
  .then(function(postLists) {
    return postLists.reduce(function(posts,list) {
      return posts.concat(list);
    },[]);
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
    return posts.sort(function(post1 ,post2) {
      return post2.created - post1.created;
    })
  })
  .then(function(posts){
    res.send(posts);
  })
  .catch(next);
};

module.exports = {
  getUser: getUser,
  getUserPosts: getUserPosts,
  getUserPledges: getUserPledges,
  followUser: followUser,
  getFeed: getFeed
};
