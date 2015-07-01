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
    res.send(user[0]);
  })
  .catch(next);
};

var getUserPostRelatedMiddleware = function(relationship) {
  return function(req, res, next) {
    var username = req.body.username || req.username;

    User.where({username: username})
    .then(function(user) {
      if (user.length === 0) throw new Error('Username not found');
      return User.getRelated(user[0], relationship);
    })
    .then(function(posts) {
      return Q.all(posts.map(Post.addHasLiked.bind(null,req.username)));
    })
    .then(function(posts) {
      return Q.all(posts.map(function(post) {
        return Post.getRelatedTo(post,'WRITTEN_IN')
        .then(function(comments) {
          post.comments = comments;
          return post;
        });
      }));
    })
    .then(function(posts) {
      res.send(posts);
    })
    .catch(next);
  };
};

var getUserPosts = getUserPostRelatedMiddleware('POSTED');
var getUserLikes = getUserPostRelatedMiddleware('LIKED');

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
var getFollowingUsers = getUserRelatedMiddleware('FOLLOWS');

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
  getUserLikes: getUserLikes,
  getUserPledges: getUserPledges,
  getUserComments: getUserComments,
  getFollowingUsers: getFollowingUsers,
  followUser: followUser,
  getFeed: getFeed
};
