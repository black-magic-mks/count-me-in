var models = require('../models');
var Post = models.Post;
var User = models.User;
var Pledge = models.Pledge;
var Comment = models.Comment;

var Q = require('q');
var db = require('seraph')();
var query = Q.nbind(db.query,db)

var aws = require('aws-sdk');
var awsCredentials = require('./amazonS3Config.js');

var getPost = function(req, res, next) {
  Post.read(req.body.postId)
  .then(function(post) {
    return Post.addHasLiked(req.username, post);
  })
  .then(function(post) {
    res.send(post);
  })
  .catch(next);
};

var createPost = function(req, res, next) {
  var AWS_ACCESS_KEY = awsCredentials.AWS_ACCESS_KEY;
  var AWS_SECRET_KEY = awsCredentials.AWS_SECRET_KEY;
  var S3_BUCKET = awsCredentials.S3_BUCKET;

  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

  // TODO: force uploads to be a certain file type and a certain size
  var s3 = new aws.S3()
  var directoryOnS3 = req.body.username + '/' + (new Date().getTime()).toString() + '/' + req.body.file.name;
  var awsUrl = 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + directoryOnS3;
  
  var options = {
    Bucket: S3_BUCKET,
    Key: directoryOnS3,
    Expires: 60,
    ContentType: req.body.file.type,
    ACL: 'public-read'
  };

  // gets signed credentials to store data to amazon s3
    // stores post data to neo4j database
      // sends amazon s3 temporary credentials to client to store file upload
  s3.getSignedUrl('putObject', options, function(err, signedRequestFromAWS){
    if(err) return res.send('Error with accessing Amazon S3')

    var postData = req.body;
    postData['aws_url'] = awsUrl;
    
    Q.all([
      User.where({username: req.username})
      .then(function(user) {
        if (user.length === 0) throw new Error('Username not found');
        return user[0];
      }),
      Post.save(postData),
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
      post.signed_request = signedRequestFromAWS
      res.json(post)
    })
    .catch(next);

  });

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

var getPostComments = function(req, res, next) {
  Post.read(req.body.postId)
  .then(function(post) {
    return Post.getRelatedTo(post,'WRITTEN_IN')
    .then(function(comments) {
      return Q.all(comments.map(function(comment) {
        return Comment.getRelatedTo(comment,'WROTE')
        .then(function(user) {
          comment.username = user[0].username;
          return comment;
        });
      }));
    });
  })
  .then(function(comments) {
    res.send(comments);
  })
  .catch(next);
};

var likePost = function(req, res, next) {
  var postId = req.body.postId;

  Q.all([
    User.where({username: req.username})
    .then(function(user) {
      if (user.length === 0) throw new Error('User not logged in');
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
  .then(function() {
    return Post.read(postId);
  })
  .then(function(post) {
    return Post.addHasLiked(req.username, post);
  })
  .then(function(post) {
    res.send(post);
  })
  .catch(next);
};

var unlikePost = function(req, res, next) {
  User.where({username: req.username})
  .then(function(user) {
    if (user.length === 0) throw new Error('User not logged in');
    return user[0];
  })
  .then(function(user) {
    return query([
      'MATCH (u)-[like:LIKED]->(p)',
      'WHERE id(u)={user} AND id(p)={post}',
      'RETURN like'
    ].join(' '),
    {
      user: user.id,
      post: parseInt(req.body.postId,10)
    });
  })
  .then(function(like) {
    if (like.length === 0) throw new Error('No like found for this post');
    return User.rel.delete(like[0]);
  })
  .then(function() {
    return Post.read(req.body.postId);
  })
  .then(function(post) {
    return Post.addHasLiked(req.username, post);
  })
  .then(function(post) {
    res.send(post);
  })
  .catch(next);
};

module.exports = {
  getPost: getPost,
  createPost: createPost,
  createComment: createComment,
  getPostComments: getPostComments,
  likePost: likePost,
  unlikePost: unlikePost
};
