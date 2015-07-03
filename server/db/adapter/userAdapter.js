var models = require('../models');
var User = models.User;
var Post = models.Post;
var Pledge = models.Pledge;
var db = require('seraph')();
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
      return Post.read(post);
    }));
  })
  .then(function(posts) {
    var pledgenames = posts.reduce(function(pledges,post) {
      if (!pledges[post.pledgename]) pledges[post.pledgename] = [];
      pledges[post.pledgename].push(post);
      return pledges;
    },{});
    console.log('pledgenames:',pledgenames);
    return Q.all(Object.keys(pledgenames).map(function(pledgename) {
      return Pledge.where({pledgename: pledgename})
      .then(function(pledge) {
        console.log(pledge);
        pledge = pledge[0];
        pledge.posts = pledgenames[pledge.pledgename];
        return pledge;
      });
    }));
  })
  .then(function(pledgesWithPosts) {
    res.send(pledgesWithPosts);
  })
  .catch(next);
};

var getUserRelatedMiddleware = function(relationship) {
  return function(req, res, next) {
    var username = req.body.username || req.username;

    User.where({username: username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return User.getRelated(user[0],relationship);
    })
    .then(function(nodes) {
      res.send(nodes);
    })
    .catch(next);
  };
};

var getUserPledges = getUserRelatedMiddleware('SUBSCRIBES_TO');
var getUserComments = getUserRelatedMiddleware('WROTE');

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
      var postsWithUsername = User.getRelated(user,'POSTED')
      .then(function(posts) {
        return Q.all(posts.map(Post.addHasLiked.bind(null,req.username)));
      })
      .then(function(posts) {
        return posts.map(function(post) {
          post.username = user.username;
          return post;
        });
      });
      return posts.concat(postsWithUsername);
    },[]);
    var pledgePosts = pledges.reduce(function(posts,pledge) {
      var postsWithPledgename = Pledge.getRelatedTo(pledge,'POSTED_IN')
      .then(function(posts) {
        return Q.all(posts.map(Post.addHasLiked.bind(null, req.username)));
      })
      .then(function(posts) {
        return posts.map(function(post) {
          post.pledgename = pledge.pledgename;
          return post;
        });
      });
      return posts.concat(postsWithPledgename);
    },[]);
    return Q.all([].concat(userPosts).concat(pledgePosts));
  })
  .then(function(postLists) {
    return postLists.reduce(function(posts,list) {
      return posts.concat(list);
    },[]);
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
  getUserComments: getUserComments,
  followUser: followUser,
  getFeed: getFeed
};
