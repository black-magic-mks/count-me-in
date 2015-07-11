var db = require('../seraph');

var Post = require('seraph-model')(db, 'Post');
var Q = require('q');
var query = Q.nbind(db.query,db);

Post.schema = {
  title: { type: String, required: true },
  aws_url: { type: String, required: true },
  text: { type: String, trim: true }
};

Post.addComputedField('username', function(post, done) {
  query([
    'MATCH (u)-[:POSTED]->(p)',
    'WHERE id(p)={post}',
    'RETURN u'
  ].join(' '),
  {
    post: post.id
  })
  .then(function(user) {
    if (user.length === 0) return done(null,null);
    done(null,user[0].username);
  })
  .catch(function(err) {
    done(err);
  });
});

Post.addComputedField('pledgename', function(post, done) {
  query([
    'MATCH (p)-[:POSTED_IN]->(pl)',
    'WHERE id(p)={post}',
    'RETURN pl'
  ].join(' '),
  {
    post: post.id
  })
  .then(function(pledge) {
    if (pledge.length === 0) return done(null,null);
    done(null,pledge[0].pledgename);
  })
  .catch(function(err) {
    done(err);
  });
});

Post.addComputedField('comments', function(post, done) {
  query([
    'MATCH (c)-[:WRITTEN_IN]->(p)',
    'WHERE id(p)={post}',
    'RETURN c'
  ].join(' '),
  {
    post: post.id
  })
  .then(function(comments) {
    return Q.all(comments.map(function(comment) {
      return query([
        'MATCH (u)-[:WROTE]->(c)',
        'WHERE id(c)={comment}',
        'RETURN u'
      ].join(' '),
      {
        comment: comment.id
      })
      .then(function(user) {
        comment.username = user[0].username;
        return comment;
      });
    }));
  })
  .then(function(comments) {
    done(null,comments);
  })
  .catch(function(err) {
    done(err);
  });
});

Post.addComputedField('likes', function(post, done) {
  query([
    'MATCH (u)-[:LIKED]->(p)',
    'WHERE id(p)={post}',
    'RETURN u'
  ].join(' '),
  {
    post: post.id
  })
  .then(function(users) {
    done(null,users.length);
  })
  .catch(function(err) {
    done(err);
  });
});

Post.fields = Object.keys(Post.schema);
Post.useTimestamps();
module.exports = Post;
